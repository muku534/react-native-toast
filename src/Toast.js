import React, { useEffect, useMemo, useCallback, useRef } from 'react';
import { PanResponder, StyleSheet } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withSpring,
    runOnJS,
    Easing,
    interpolate,
    Extrapolation,
} from 'react-native-reanimated';

// Gentle, floating spring for the round circle arrival
const CIRCLE_SPRING = {
    damping: 22,
    stiffness: 95,
    mass: 0.9,
};

const Toast = ({
    visible,
    duration,
    position = 'top',
    stackIndex = 0,
    stackSpacing = 68,
    children,
    onHide,
    style,
    theme,
}) => {
    const opacity = useSharedValue(0);
    const translateY = useSharedValue(position === 'top' ? -65 : position === 'center' ? 25 : 65);
    const translateX = useSharedValue(0);
    const scale = useSharedValue(0.65);
    const expandProgress = useSharedValue(0); // 0 = compact circle, 1 = expanded capsule
    const hideCalledRef = useRef(false);
    const isHidingRef = useRef(false);
    const hasEnteredRef = useRef(false);
    const expandTimerRef = useRef(null);
    const hideTimeoutRef = useRef(null);

    // Smooth stacking transition:
    // When an older toast is dismissed, subsequent toasts smoothly glide up into their new slot.
    const resolvedSpacing = position === 'bottom' ? -stackSpacing : stackSpacing;
    const targetStackY = stackIndex * resolvedSpacing;
    const stackY = useSharedValue(targetStackY);

    useEffect(() => {
        stackY.value = withTiming(targetStackY, {
            duration: 420,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        });
    }, [targetStackY]);

    // Keep onHide reference stable so re-renders do NOT re-trigger animations
    const onHideRef = useRef(onHide);
    useEffect(() => {
        onHideRef.current = onHide;
    }, [onHide]);

    const positionStyle = useMemo(
        () => {
            if (position === 'top') return styles.top;
            if (position === 'center') return styles.center;
            return styles.bottom;
        },
        [position]
    );

    const safeOnHide = useCallback(() => {
        if (!hideCalledRef.current) {
            hideCalledRef.current = true;
            onHideRef.current?.();
        }
    }, []);

    const hideToast = useCallback(() => {
        if (isHidingRef.current || hideCalledRef.current) return;
        isHidingRef.current = true;

        // Clear any pending entrance expansion or auto-hide timers
        if (expandTimerRef.current) clearTimeout(expandTimerRef.current);
        if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);

        const exitY = position === 'top' ? -70 : position === 'center' ? 20 : 70;

        // Fallback safety timer (only fires if animations stall)
        const safetyTimer = setTimeout(() => {
            safeOnHide();
        }, 1800);

        // Phase 1: Smoothly and visibly collapse capsule back into the round circle
        expandProgress.value = withTiming(0, {
            duration: 500,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        });

        // Phase 2: Gentle dwell as circle badge, then gracefully float up into Dynamic Island & scale away
        const floatTimer = setTimeout(() => {
            opacity.value = withTiming(0, {
                duration: 420,
                easing: Easing.out(Easing.cubic),
            });
            scale.value = withTiming(0.5, {
                duration: 460,
                easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            });
            translateY.value = withTiming(exitY, {
                duration: 480,
                easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            });
        }, 620); // 500ms collapse + 120ms calm circle dwell

        // Phase 3: Clean completion and unmount once fully exited
        const completeTimer = setTimeout(() => {
            clearTimeout(safetyTimer);
            safeOnHide();
        }, 1150);
    }, [position, safeOnHide]);

    // Entrance and timer effect — runs ONLY ONCE when mounted/visible
    useEffect(() => {
        if (visible && !hasEnteredRef.current) {
            hasEnteredRef.current = true;
            hideCalledRef.current = false;
            isHidingRef.current = false;

            // Step 1: Circle smoothly floats down, scales to full size, and settles cleanly
            opacity.value = withTiming(1, { duration: 420, easing: Easing.out(Easing.cubic) });
            translateY.value = withTiming(0, {
                duration: 520,
                easing: Easing.bezier(0.16, 1, 0.3, 1),
            });
            scale.value = withTiming(1, {
                duration: 500,
                easing: Easing.bezier(0.16, 1, 0.3, 1),
            });
            translateX.value = 0;
            expandProgress.value = 0;

            // Step 2: Dwell pause so the circular badge lands & settles properly first,
            // and only then smoothly expands into the full capsule.
            expandTimerRef.current = setTimeout(() => {
                expandProgress.value = withTiming(1, {
                    duration: 620,
                    easing: Easing.bezier(0.25, 0.1, 0.25, 1), // Liquid smooth expansion curve (gentle start, fluid cruise, soft cushion)
                });
            }, 950);

            // Step 3: Auto-dismiss timer (gives full reading duration after expansion)
            if (duration && duration !== Infinity) {
                hideTimeoutRef.current = setTimeout(() => {
                    hideToast();
                }, duration + 1550);
            }

            return () => {
                if (expandTimerRef.current) clearTimeout(expandTimerRef.current);
                if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
            };
        } else if (!visible && hasEnteredRef.current) {
            hideToast();
        }
    }, [visible, duration, hideToast]);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [
            { translateY: translateY.value + stackY.value },
            { translateX: translateX.value },
            { scale: scale.value },
        ],
    }));

    const panResponder = useMemo(
        () =>
            PanResponder.create({
                onMoveShouldSetPanResponder: (evt, gestureState) => {
                    return Math.abs(gestureState.dx) > 15 || Math.abs(gestureState.dy) > 15;
                },
                onPanResponderMove: (evt, gestureState) => {
                    translateX.value = gestureState.dx;
                    if (position === 'top' && gestureState.dy < 0) {
                        translateY.value = gestureState.dy * 0.3;
                    } else if (position === 'bottom' && gestureState.dy > 0) {
                        translateY.value = gestureState.dy * 0.3;
                    }
                    opacity.value = interpolate(
                        Math.abs(gestureState.dx),
                        [0, 150],
                        [1, 0.3],
                        Extrapolation.CLAMP
                    );
                },
                onPanResponderRelease: (evt, gestureState) => {
                    if (Math.abs(gestureState.dx) > 80) {
                        // Dismiss: fly out in swipe direction
                        const direction = gestureState.dx > 0 ? 1 : -1;
                        translateX.value = withTiming(direction * 400, { duration: 250 });
                        opacity.value = withTiming(0, { duration: 250 });
                        scale.value = withTiming(0.85, { duration: 250 }, (finished) => {
                            if (finished) {
                                runOnJS(safeOnHide)();
                            }
                        });
                    } else if (position === 'top' && gestureState.dy < -40) {
                        // Swipe up to dismiss (collapses to circle and pops away)
                        hideToast();
                    } else if (position === 'bottom' && gestureState.dy > 40) {
                        // Swipe down to dismiss (collapses to circle and pops away)
                        hideToast();
                    } else {
                        // Snap back with spring
                        translateX.value = withSpring(0, { damping: 18, stiffness: 180 });
                        translateY.value = withSpring(0, { damping: 18, stiffness: 180 });
                        opacity.value = withSpring(1);
                    }
                },
            }),
        [position, hideToast, safeOnHide]
    );

    if (!visible && !hasEnteredRef.current) return null;

    // Inject theme, duration, expandProgress and hideToast props to children
    const renderContent = () => {
        if (React.isValidElement(children)) {
            return React.cloneElement(children, {
                theme: children.props.theme || theme,
                duration,
                expandProgress,
                hideToast,
            });
        }
        return children;
    };

    return (
        <Animated.View
            {...panResponder.panHandlers}
            style={[
                styles.container,
                { zIndex: 9999 - stackIndex },
                animatedStyle,
                positionStyle,
                style,
            ]}
        >
            {renderContent()}
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 9999,
    },
    top: {
        top: 0,
    },
    center: {
        // Center positioning handled by container
    },
    bottom: {
        bottom: 20,
    },
});

export default React.memo(Toast);
