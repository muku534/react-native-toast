import React, { useEffct, useEffect, useState } from 'react';
import { Animated, StyleSheet, View, Text } from 'react-native';

const Toast = ({ visible, duration, position, children, onHide, style }) => {

    const [opacity] = useState(new Animated.Value(0));

    useEffect(() => {
        if (visible) {
            Animated.timing(opacity, {
                toValue: 1,
                duration: 1500,
                useNativeDriver: true,
            }).start();

            if (duration !== Infinity) {
                setTimeout(() => {
                    Animated.timing(opacity, {
                        toValue: 0,
                        duration: 1500,
                        useNativeDriver: true,
                    }).start(onHide);
                }, duration);
            }
        }
    }, [visible]);

    if (!visible) return null;

    return (
        <Animated.View style={[styles.container, { opacity }, position === 'top' ? styles.top : styles.bottom, style]}>
            <View style={styles.toast}>
                {children}
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    top: {
        top: 50,
    },
    bottom: {
        bottom: 50,
    },
    toast: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
});

export default Toast;

