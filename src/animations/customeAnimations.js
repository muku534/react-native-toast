import { Animated } from 'react-native';

export const customEnterAnimation = (opacity, translateY) => {
    return Animated.parallel([
        Animated.timing(opacity, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }),
        Animated.spring(translateY, {
            toValue: 0,
            friction: 5,
            useNativeDriver: true,
        }),
    ]);
};

export const customExitAnimation = (opacity, translateY) => {
    return Animated.parallel([
        Animated.timing(opacity, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
        }),
        Animated.timing(translateY, {
            toValue: -50,
            duration: 1000,
            useNativeDriver: true,
        }),
    ]);
};
