import React, { useEffect, useMemo, useCallback, useRef } from 'react';
import { PanResponder, StyleSheet } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withSpring,
    withDelay,
    runOnJS,
    Easing,
    interpolate,
    cancelAnimation,
} from 'react-native-reanimated';

const SPRING_CONFIG = {
    damping: 18,
    stiffness: 160,
    mass: 0.8,
};

const Toast = ({ visible, duration, position, children, onHide, style, theme }) => {
    const opacity = useSharedValue(0);
    const translateY = useSharedValue(position === 'top' ? -80 : position === 'center' ? 30 : 80);
    const translateX = useSharedValue(0);
    const scale = useSharedValue(0.85);
    const hideCalledRef = useRef(false);

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
            onHide?.();
        }
    }, [onHide]);

    useEffect(() => {
        hideCalledRef.current = false;

        if (visible) {
            // Entrance animation — smooth spring with overshoot
            opacity.value = withTiming(1, { duration: 280, easing: Easing.out(Easing.cubic) });
            translateY.value = withSpring(0, SPRING_CONFIG);
            scale.value = withSpring(1, { ...SPRING_CONFIG, damping: 14 });
            translateX.value = 0;

            // Auto-dismiss timer
            if (duration && duration !== Infinity) {
                const hideTimeout = setTimeout(() => {
                    hideToast();
                }, duration);

                return () => clearTimeout(hideTimeout);
            }
        } else {
            hideToast();
        }
    }, [visible, duration]);

    const hideToast = useCallback(() => {
        const exitY = position === 'top' ? -60 : position === 'center' ? 20 : 60;

        opacity.value = withTiming(0, {
            duration: 250,
            easing: Easing.in(Easing.cubic),
        });
        translateY.value = withTiming(exitY, {
            duration: 250,
            easing: Easing.in(Easing.cubic),
        });
        scale.value = withTiming(0.9, {
            duration: 250,
            easing: Easing.in(Easing.cubic),
        }, (finished) => {
            // Only fire onHide after animation actually completes
            if (finished) {
                runOnJS(safeOnHide)();
            }
        });
    }, [position, safeOnHide]);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [
            { translateY: translateY.value },
            { translateX: translateX.value },
            { scale: scale.value },
        ],
    }));

    const panResponder = useMemo(
        () =>
            PanResponder.create({
                onMoveShouldSetPanResponder: (evt, gestureState) => {
                    // More responsive swipe detection
                    return Math.abs(gestureState.dx) > 15 || Math.abs(gestureState.dy) > 15;
                },
                onPanResponderMove: (evt, gestureState) => {
                    translateX.value = gestureState.dx;
                    // Add subtle vertical follow for natural feel
                    if (position === 'top' && gestureState.dy < 0) {
                        translateY.value = gestureState.dy * 0.3;
                    } else if (position === 'bottom' && gestureState.dy > 0) {
                        translateY.value = gestureState.dy * 0.3;
                    }
                    // Fade as user swipes further
                    opacity.value = interpolate(
                        Math.abs(gestureState.dx),
                        [0, 150],
                        [1, 0.3],
                        'clamp'
                    );
                },
                onPanResponderRelease: (evt, gestureState) => {
                    if (Math.abs(gestureState.dx) > 80) {
                        // Dismiss: fly out in swipe direction
                        const direction = gestureState.dx > 0 ? 1 : -1;
                        translateX.value = withTiming(direction * 400, { duration: 200 });
                        opacity.value = withTiming(0, { duration: 200 });
                        scale.value = withTiming(0.85, { duration: 200 }, (finished) => {
                            if (finished) {
                                runOnJS(safeOnHide)();
                            }
                        });
                    } else if (position === 'top' && gestureState.dy < -40) {
                        // Swipe up to dismiss (for top toasts)
                        translateY.value = withTiming(-100, { duration: 200 });
                        opacity.value = withTiming(0, { duration: 200 }, (finished) => {
                            if (finished) runOnJS(safeOnHide)();
                        });
                    } else if (position === 'bottom' && gestureState.dy > 40) {
                        // Swipe down to dismiss (for bottom toasts)
                        translateY.value = withTiming(100, { duration: 200 });
                        opacity.value = withTiming(0, { duration: 200 }, (finished) => {
                            if (finished) runOnJS(safeOnHide)();
                        });
                    } else {
                        // Snap back with spring
                        translateX.value = withSpring(0, { damping: 15, stiffness: 200 });
                        translateY.value = withSpring(0, { damping: 15, stiffness: 200 });
                        opacity.value = withSpring(1);
                    }
                },
            }),
        [position, safeOnHide]
    );

    if (!visible) return null;

    // If children is a React element, inject theme and duration props
    const renderContent = () => {
        if (React.isValidElement(children)) {
            return React.cloneElement(children, { theme, duration });
        }
        return children;
    };

    return (
        <Animated.View
            {...panResponder.panHandlers}
            style={[styles.container, animatedStyle, positionStyle, style]}
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
