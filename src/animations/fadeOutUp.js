import { Animated } from 'react-native';

export const fadeOutUp = (opacity, translateY) => {
    return Animated.parallel([
        Animated.timing(opacity, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }),
        Animated.timing(translateY, {
            toValue: -50,
            duration: 500,
            useNativeDriver: true,
        }),
    ]);
};
