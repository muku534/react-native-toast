import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withDelay,
} from 'react-native-reanimated';

/**
 * WarningIcon — Pixel-perfect animated '!' mark.
 */
const WarningIcon = ({ size = 20, color = '#F59E0B' }) => {
    const scale = useSharedValue(0.2);
    const opacity = useSharedValue(0);

    useEffect(() => {
        scale.value = withDelay(
            100,
            withSpring(1, { damping: 13, stiffness: 180, mass: 0.7 })
        );
        opacity.value = withDelay(100, withSpring(1));
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
        opacity: opacity.value,
    }));

    const barW = 2.4;
    const barH = 8.5;
    const dotSize = 3.6;

    return (
        <View style={[styles.container, { width: size, height: size }]}>
            <Animated.View style={[styles.content, animatedStyle]}>
                <View
                    style={{
                        width: barW,
                        height: barH,
                        backgroundColor: color,
                        borderRadius: 1.5,
                        marginBottom: 2.5,
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
