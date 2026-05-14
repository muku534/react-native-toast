import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withDelay,
    Easing,
} from 'react-native-reanimated';

/**
 * InfoIcon — Animated "i" information symbol.
 * Dot + vertical bar that fade in.
 */
const InfoIcon = ({ size = 22, color = '#2563EB', animated = true }) => {
    const opacity = useSharedValue(animated ? 0 : 1);

    useEffect(() => {
        if (animated) {
            opacity.value = withDelay(
                100,
                withTiming(1, { duration: 350, easing: Easing.out(Easing.cubic) })
            );
        }
    }, [animated]);

    const contentStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));

    const dotSize = Math.max(3, size * 0.16);
    const barW = Math.max(2, size * 0.12);
    const barH = size * 0.35;

    return (
        <View style={[styles.container, { width: size, height: size }]}>
            <Animated.View style={[styles.content, contentStyle]}>
                <View
                    style={{
                        width: dotSize,
                        height: dotSize,
                        borderRadius: dotSize / 2,
                        backgroundColor: color,
                        marginBottom: size * 0.08,
                    }}
                />
                <View
                    style={{
                        width: barW,
                        height: barH,
                        backgroundColor: color,
                        borderRadius: barW,
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

export default React.memo(InfoIcon);
