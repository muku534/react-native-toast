import React, { useEffect, useMemo } from 'react';
import { PanResponder, StyleSheet, Text } from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from './utils/Pixel/Index';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withSpring, runOnJS } from 'react-native-reanimated';

const Toast = ({ visible, duration, position, children, onHide, style }) => {
    const opacity = useSharedValue(0);
    const translateY = useSharedValue(-50);
    const translateX = useSharedValue(0);
    const scale = useSharedValue(0.9); // Start with a slightly smaller scale

    const positionStyle = useMemo(() => {
        return position === 'top' ? styles.top : styles.bottom;
    }, [position]);

    useEffect(() => {
        if (visible) {
            opacity.value = withTiming(1, { duration: 300 });
            translateY.value = withSpring(0, { damping: 8, stiffness: 110 });
            scale.value = withSpring(1, { damping: 8, stiffness: 110 });

            if (duration !== Infinity) {
                const hideTimeout = setTimeout(() => {
                    opacity.value = withTiming(0, { duration: 300 });
                    translateY.value = withTiming(-50, { duration: 300 });
                    runOnJS(onHide)();
                }, duration);

                return () => clearTimeout(hideTimeout);
            }
        } else {
            opacity.value = withTiming(0, { duration: 300 });
            translateY.value = withTiming(-50, { duration: 300 });
            runOnJS(onHide)();
        }
    }, [visible, duration, onHide]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
            transform: [
                { translateY: translateY.value },
                { translateX: translateX.value },
                { scale: scale.value },
            ],
        };
    });

    // Set up PanResponder for swipe gestures
    const panResponder = useMemo(() =>
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
                    runOnJS(onHide)();
                } else {
                    // If the swipe is less than the threshold, reset the position
                    translateX.value = withSpring(0);
                }
            },
        }), [translateX, opacity, onHide]);


    if (!visible) return null;

    return (
        <Animated.View
            {...panResponder.panHandlers}
            style={[
                styles.container,
                animatedStyle,
                positionStyle,
                style,
            ]}
        >
            <Animated.View style={[styles.toast, { opacity }]}>
                {typeof children === 'string' ? <Text>{children}</Text> : children}
            </Animated.View>
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
        bottom: 50,
    },
    toast: {
        marginTop: hp(1),
        // padding: 10,
        backgroundColor: 'white',
        borderRadius: wp(4),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 }, // Adjust to spread the shadow more
        shadowOpacity: 0.5, // Adjust for the desired darkness
        shadowRadius: 10, // Increase for a more spread-out shadow
        elevation: 20, // Higher elevation for Android shadow
    },
});

export default React.memo(Toast);
