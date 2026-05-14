import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withDelay,
    Easing,
    interpolate,
} from 'react-native-reanimated';

/**
 * CrossIcon — Animated X mark.
 * Two strokes that draw in sequentially with a cross shape.
 */
const CrossIcon = ({ size = 22, color = '#DC2626', animated = true }) => {
    const progress = useSharedValue(animated ? 0 : 1);

    useEffect(() => {
        if (animated) {
            progress.value = withDelay(
                100,
                withTiming(1, { duration: 400, easing: Easing.out(Easing.cubic) })
            );
        }
    }, [animated]);

    const stroke = Math.max(2, size * 0.12);
    const barLen = size * 0.5;

    const bar1Style = useAnimatedStyle(() => {
        const p = interpolate(progress.value, [0, 0.55], [0, 1], 'clamp');
        return {
            transform: [{ rotate: '45deg' }, { scaleY: p }],
            opacity: p,
        };
    });

    const bar2Style = useAnimatedStyle(() => {
        const p = interpolate(progress.value, [0.3, 1], [0, 1], 'clamp');
        return {
            transform: [{ rotate: '-45deg' }, { scaleY: p }],
            opacity: p,
        };
    });

    return (
        <View style={[styles.container, { width: size, height: size }]}>
            <Animated.View
                style={[
                    {
                        position: 'absolute',
                        width: stroke,
                        height: barLen,
                        backgroundColor: color,
                        borderRadius: stroke,
                    },
                    bar1Style,
                ]}
            />
            <Animated.View
                style={[
                    {
                        position: 'absolute',
                        width: stroke,
                        height: barLen,
                        backgroundColor: color,
                        borderRadius: stroke,
                    },
                    bar2Style,
                ]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default React.memo(CrossIcon);
