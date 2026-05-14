import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withDelay,
    Easing,
} from 'react-native-reanimated';

/**
 * ProgressBar — flush edge-to-edge countdown indicator.
 * Sits at the very bottom of the toast card, no padding.
 */
const ProgressBar = ({ duration, color = '#22C55E', trackColor = 'rgba(0,0,0,0.05)' }) => {
    const progress = useSharedValue(1);
    const barOpacity = useSharedValue(0);

    useEffect(() => {
        if (duration && duration !== Infinity) {
            barOpacity.value = withDelay(200, withTiming(1, { duration: 250 }));
            progress.value = withTiming(0, {
                duration: duration,
                easing: Easing.linear,
            });
        }
    }, [duration]);

    const barStyle = useAnimatedStyle(() => ({
        width: `${progress.value * 100}%`,
        opacity: barOpacity.value,
    }));

    if (!duration || duration === Infinity) return null;

    return (
        <Animated.View style={styles.track}>
            <Animated.View style={[styles.trackBg, { backgroundColor: trackColor }]} />
            <Animated.View
                style={[
                    styles.bar,
                    { backgroundColor: color },
                    barStyle,
                ]}
            />
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    track: {
        height: 3,
        width: '100%',
        position: 'relative',
    },
    trackBg: {
        ...StyleSheet.absoluteFillObject,
    },
    bar: {
        height: '100%',
        position: 'absolute',
        left: 0,
        top: 0,
    },
});

export default React.memo(ProgressBar);
