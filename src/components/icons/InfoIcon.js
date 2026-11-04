import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withDelay,
} from 'react-native-reanimated';

/**
 * InfoIcon — Pixel-perfect animated 'i' mark.
 */
const InfoIcon = ({ size = 20, color = '#3B82F6' }) => {
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

    const dotSize = 3.6;
    const barW = 2.4;
    const barH = 8.5;

    return (
        <View style={[styles.container, { width: size, height: size }]}>
            <Animated.View style={[styles.content, animatedStyle]}>
                <View
                    style={{
                        width: dotSize,
                        height: dotSize,
                        borderRadius: dotSize / 2,
                        backgroundColor: color,
                        marginBottom: 2.5,
                    }}
                />
                <View
                    style={{
                        width: barW,
                        height: barH,
                        backgroundColor: color,
                        borderRadius: 1.5,
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
