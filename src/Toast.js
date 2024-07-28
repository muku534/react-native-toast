import React, { useEffect, useState, useMemo } from 'react';
import { Animated, StyleSheet, View, Text } from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from './Pixel/Index';

const Toast = ({ visible, duration, position, children, onHide, style }) => {
    const [opacity] = useState(new Animated.Value(0));
    const [translateY] = useState(new Animated.Value(-50)); // Initial value for fadeInDown effect

    const positionStyle = useMemo(() => {
        return position === 'top' ? styles.top : styles.bottom;
    }, [position]);

    useEffect(() => {
        if (visible) {
            Animated.parallel([
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(translateY, {
                    toValue: 0, // Final position for fadeInDown effect
                    duration: 500,
                    useNativeDriver: true,
                })
            ]).start(() => {
                console.log('Toast shown:', children);
            });

            if (duration !== Infinity) {
                const hideTimeout = setTimeout(() => {
                    Animated.parallel([
                        Animated.timing(opacity, {
                            toValue: 0,
                            duration: 500,
                            useNativeDriver: true,
                        }),
                        Animated.timing(translateY, {
                            toValue: -50, // Initial position for fadeInDown effect
                            duration: 500,
                            useNativeDriver: true,
                        })
                    ]).start(() => {
                        console.log('Toast hidden:', children);
                        onHide();
                    });
                }, duration);

                return () => clearTimeout(hideTimeout); // Clean up timeout if component unmounts
            }
        } else {
            Animated.parallel([
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(translateY, {
                    toValue: -50,
                    duration: 500,
                    useNativeDriver: true,
                })
            ]).start(onHide);
        }
    }, [visible, duration, onHide, opacity, translateY]);

    if (!visible) return null;

    return (
        <Animated.View style={[styles.container, { opacity, transform: [{ translateY }] }, positionStyle, style]}>
            <Animated.View style={[styles.toast, { opacity }]}>
                {typeof children === 'string' ? <Text>{children}</Text> : children}
            </Animated.View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 9999,
    },
    top: {
        top: 0,
    },
    bottom: {
        bottom: 50,
    },
    toast: {
        marginTop: hp(2),
        // padding: 10,
        backgroundColor: 'white',
        borderRadius: wp(2),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
});

export default React.memo(Toast);
