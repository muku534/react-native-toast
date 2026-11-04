import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withDelay,
} from 'react-native-reanimated';

/**
 * CheckIcon — Pixel-perfect, fully rotated checkmark.
 * Inner view preserves static -45deg rotation so Reanimated scale
 * never overrides the rotation transform.
 */
const CheckIcon = ({ size = 20, color = '#22C55E' }) => {
    const scale = useSharedValue(0.2);
    const opacity = useSharedValue(0);

    useEffect(() => {
        scale.value = withDelay(
            80,
            withSpring(1, { damping: 13, stiffness: 180, mass: 0.7 })
        );
        opacity.value = withDelay(80, withSpring(1));
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
        opacity: opacity.value,
    }));

    // Golden ratio checkmark proportions: long side ~14px, short side ~7.5px
    const checkWidth = Math.round(size * 0.72); // 14px
    const checkHeight = Math.round(size * 0.38); // 7.5px
    const strokeWidth = 2.5;

    return (
        <View style={[styles.container, { width: size, height: size }]}>
            <Animated.View style={[styles.animWrap, animatedStyle]}>
                <View
                    style={[
                        styles.checkStroke,
                        {
                            width: checkWidth,
                            height: checkHeight,
                            borderLeftWidth: strokeWidth,
                            borderBottomWidth: strokeWidth,
                            borderColor: color,
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
    animWrap: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkStroke: {
        transform: [{ rotate: '-45deg' }],
        borderBottomLeftRadius: 1.5,
        marginTop: -2,
        marginLeft: 1,
    },
});

export default React.memo(CheckIcon);
