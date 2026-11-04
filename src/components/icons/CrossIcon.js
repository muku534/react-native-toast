import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withDelay,
} from 'react-native-reanimated';

/**
 * CrossIcon — Pixel-perfect animated X mark.
 */
const CrossIcon = ({ size = 20, color = '#EF4444' }) => {
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

    const barLen = Math.round(size * 0.75);
    const stroke = 2.4;

    return (
        <View style={[styles.container, { width: size, height: size }]}>
            <Animated.View style={[styles.iconWrap, animatedStyle]}>
                <View
                    style={[
                        styles.bar,
                        {
                            width: stroke,
                            height: barLen,
                            backgroundColor: color,
                            transform: [{ rotate: '45deg' }],
                        },
                    ]}
                />
                <View
                    style={[
                        styles.bar,
                        {
                            width: stroke,
                            height: barLen,
                            backgroundColor: color,
                            transform: [{ rotate: '-45deg' }],
                        },
                    ]}
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
    iconWrap: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bar: {
        position: 'absolute',
        borderRadius: 2,
    },
});

export default React.memo(CrossIcon);
