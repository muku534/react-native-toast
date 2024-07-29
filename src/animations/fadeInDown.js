import { Animated } from 'react-native';

export const fadeInDown = (opacity, translateY) => {
    return Animated.parallel([
        Animated.timing(opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }),
        Animated.timing(translateY, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }),
    ]);
};
