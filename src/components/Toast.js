import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet, View, Text } from 'react-native';

const Toast = ({ visible, duration, position, children, onHide, style }) => {
    const [opacity] = useState(new Animated.Value(0));

    useEffect(() => {
        if (visible) {
            console.log('Toast visible:', children);
            Animated.timing(opacity, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }).start(() => {
                console.log('Toast shown:', children);
            });

            if (duration !== Infinity) {
                setTimeout(() => {
                    Animated.timing(opacity, {
                        toValue: 0,
                        duration: 500,
                        useNativeDriver: true,
                    }).start(() => {
                        console.log('Toast hidden:', children);
                        onHide();
                    });
                }, duration);
            }
        }
    }, [visible, duration, onHide, opacity, children]);

    if (!visible) return null;

    return (
        <Animated.View style={[styles.container, { opacity }, position === 'top' ? styles.top : styles.bottom, style]}>
            <View style={styles.toast}>
                {typeof children === 'string' ? <Text>{children}</Text> : children}
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
        zIndex: 9999,  // Ensure the toast is above other elements
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
