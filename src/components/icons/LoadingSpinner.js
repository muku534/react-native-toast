import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
    Easing,
} from 'react-native-reanimated';

/**
 * LoadingSpinner — Smooth spinning arc.
 * Thin track with a spinning colored arc segment.
 */
const LoadingSpinner = ({ size = 22, color = '#7C3AED' }) => {
    const rotation = useSharedValue(0);

    useEffect(() => {
        rotation.value = withRepeat(
            withTiming(360, { duration: 850, easing: Easing.linear }),
            -1,
            false
        );
    }, []);

    const spinStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: `${rotation.value}deg` }],
    }));

    const arcW = Math.max(2, size * 0.11);

    return (
        <View style={[styles.container, { width: size, height: size }]}>
            <View
                style={[
                    styles.track,
                    {
                        width: size,
                        height: size,
                        borderRadius: size / 2,
                        borderWidth: arcW,
                        borderColor: color + '20',
                    },
                ]}
            />
            <Animated.View
                style={[
                    styles.arc,
                    {
                        width: size,
                        height: size,
                        borderRadius: size / 2,
                        borderWidth: arcW,
                        borderColor: 'transparent',
                        borderTopColor: color,
                        borderRightColor: color + '50',
                    },
                    spinStyle,
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
    track: {
        position: 'absolute',
    },
    arc: {
        position: 'absolute',
    },
});

export default React.memo(LoadingSpinner);
