import React, { useEffect, useMemo } from 'react';
import { Easing, PanResponder, StyleSheet } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withSpring,
    runOnJS,
} from 'react-native-reanimated';

const Toast = ({ visible, duration, position, children, onHide, style }) => {
    const opacity = useSharedValue(0);
    const translateY = useSharedValue(position === 'top' ? -50 : 50);
    const translateX = useSharedValue(0);
    const scale = useSharedValue(0.9);

    const positionStyle = useMemo(() => (position === 'top' ? styles.top : styles.bottom), [position]);

    useEffect(() => {
        if (visible) {
            opacity.value = withTiming(1, { duration: 300 });
            translateY.value = withSpring(0, { damping: 10, stiffness: 120 });
            scale.value = withSpring(1, { damping: 10, stiffness: 120 });

            if (duration !== Infinity) {
                const hideTimeout = setTimeout(() => {
                    hideToast();
                }, duration);

                return () => clearTimeout(hideTimeout);
            }
        } else {
            hideToast();
        }
    }, [visible, duration]);

    const hideToast = () => {
        opacity.value = withTiming(0, { duration: 300, easing: Easing.ease });
        translateY.value = withTiming(position === 'top' ? -50 : 50, { duration: 300, easing: Easing.ease });
        scale.value = withTiming(0.9, { duration: 300, easing: Easing.ease });
        runOnJS(onHide)();
    };

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
                    return Math.abs(gestureState.dx) > 20; // Swipe detection threshold
                },
                onPanResponderMove: (evt, gestureState) => {
                    translateX.value = gestureState.dx; // Update translateX as the user swipes
                },
                onPanResponderRelease: (evt, gestureState) => {
                    if (Math.abs(gestureState.dx) > 100) { // If the swipe distance is more than 100 pixels, remove the toast
                        opacity.value = withTiming(0, { duration: 200 });
                        translateY.value = withTiming(position === 'top' ? -50 : 50, { duration: 200 });
                        scale.value = withTiming(0.9, { duration: 200 });
                        runOnJS(onHide)();
                    } else {
                        // If the swipe is less than the threshold, reset the position
                        translateX.value = withSpring(0);
                    }
                },
            }),
        []
    );

    if (!visible) return null;

    return (
        <Animated.View
            {...panResponder.panHandlers}
            style={[styles.container, animatedStyle, positionStyle, style]}
        >
            {children}
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
    bottom: {
        bottom: 20,
    },
});

export default React.memo(Toast);
