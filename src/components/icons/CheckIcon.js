import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withDelay,
    withSpring,
    Easing,
    interpolate,
} from 'react-native-reanimated';

/**
 * CheckIcon — Animated checkmark.
 * Clean two-stroke design that draws in sequentially.
 */
const CheckIcon = ({ size = 22, color = '#16A34A', animated = true }) => {
    const progress = useSharedValue(animated ? 0 : 1);

    useEffect(() => {
        if (animated) {
            progress.value = withDelay(
                100,
                withTiming(1, { duration: 450, easing: Easing.out(Easing.cubic) })
            );
        }
    }, [animated]);

    const stroke = Math.max(2, size * 0.12);
    const shortLen = size * 0.3;
    const longLen = size * 0.5;

    const leftBarStyle = useAnimatedStyle(() => {
        const p = interpolate(progress.value, [0, 0.45], [0, 1], 'clamp');
        return {
            transform: [{ rotate: '45deg' }, { scaleY: p }],
            opacity: p,
        };
    });

    const rightBarStyle = useAnimatedStyle(() => {
        const p = interpolate(progress.value, [0.3, 1], [0, 1], 'clamp');
        return {
            transform: [{ rotate: '-45deg' }, { scaleY: p }],
            opacity: p,
        };
    });

    return (
        <View style={[styles.container, { width: size, height: size }]}>
            <View style={[styles.checkWrap, { width: size * 0.6, height: size * 0.6 }]}>
                <Animated.View
                    style={[
                        {
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            width: stroke,
                            height: shortLen,
                            backgroundColor: color,
                            borderRadius: stroke,
                            transformOrigin: 'bottom',
                        },
                        leftBarStyle,
                    ]}
                />
                <Animated.View
                    style={[
                        {
                            position: 'absolute',
                            bottom: 0,
                            left: stroke * 0.4,
                            width: stroke,
                            height: longLen,
                            backgroundColor: color,
                            borderRadius: stroke,
                            transformOrigin: 'bottom',
                        },
                        rightBarStyle,
                    ]}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkWrap: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default React.memo(CheckIcon);
