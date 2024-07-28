import React, { useEffect, useState, useMemo } from 'react';
import { Animated, StyleSheet, View, Text } from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from './Pixel/Index';

const Toast = ({ visible, duration, position, children, onHide, style }) => {
    const [opacity] = useState(new Animated.Value(0));

    const positionStyle = useMemo(() => {
        return position === 'top' ? styles.top : styles.bottom;
    }, [position]);

    useEffect(() => {
        if (visible) {
            Animated.timing(opacity, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }).start(() => {
                console.log('Toast shown:', children);
            });

            if (duration !== Infinity) {
                const hideTimeout = setTimeout(() => {
                    Animated.timing(opacity, {
                        toValue: 0,
                        duration: 500,
                        useNativeDriver: true,
                    }).start(() => {
                        console.log('Toast hidden:', children);
                        onHide();
                    });
                }, duration);

                return () => clearTimeout(hideTimeout); // Clean up timeout if component unmounts
            }
        } else {
            Animated.timing(opacity, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }).start(onHide);
        }
    }, [visible, duration, onHide, opacity]);

    if (!visible) return null;

    return (
        <Animated.View style={[styles.container, { opacity }, positionStyle, style]}>
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
        zIndex: 9999,
    },
    top: {
        top: 0,
    },
    bottom: {
        bottom: 50,
    },
    toast: {
        marginTop: hp(2)
        // borderRadius: 5,
        // backgroundColor: 'rgba(0,0,0,0.7)',
    },
});

export default React.memo(Toast);
