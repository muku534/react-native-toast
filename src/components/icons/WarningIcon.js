import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withDelay,
    withSequence,
    Easing,
} from 'react-native-reanimated';

/**
 * WarningIcon — Animated exclamation mark with subtle shake.
 * Bar + dot that fade in, followed by a quick shake.
 */
const WarningIcon = ({ size = 22, color = '#D97706', animated = true }) => {
    const opacity = useSharedValue(animated ? 0 : 1);
    const shake = useSharedValue(0);

    useEffect(() => {
        if (animated) {
            opacity.value = withDelay(
                100,
                withTiming(1, { duration: 350, easing: Easing.out(Easing.cubic) })
            );
            shake.value = withDelay(
                350,
                withSequence(
                    withTiming(-2.5, { duration: 40 }),
                    withTiming(2.5, { duration: 40 }),
                    withTiming(-1.5, { duration: 40 }),
                    withTiming(1.5, { duration: 40 }),
                    withTiming(0, { duration: 40 })
                )
            );
        }
    }, [animated]);

    const contentStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [{ translateX: shake.value }],
    }));

    const barW = Math.max(2, size * 0.12);
    const barH = size * 0.35;
    const dotSize = Math.max(3, size * 0.16);

    return (
        <View style={[styles.container, { width: size, height: size }]}>
            <Animated.View style={[styles.content, contentStyle]}>
                <View
                    style={{
                        width: barW,
                        height: barH,
                        backgroundColor: color,
                        borderRadius: barW,
                        marginBottom: size * 0.08,
                    }}
                />
                <View
                    style={{
                        width: dotSize,
                        height: dotSize,
                        borderRadius: dotSize / 2,
                        backgroundColor: color,
                    }}
                />
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default React.memo(WarningIcon);
