import LottieView from 'lottie-react-native';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from '../utils/Pixel/Index';

const SuccessToast = ({ message, theme = 'light' }) => {
    const isDark = theme === 'dark';
    const containerBg = isDark ? '#111827' : '#F7F7FC';
    const textColor = isDark ? '#F3F4F6' : '#064E3B';

    return (
        <View style={[styles.container, { backgroundColor: containerBg }]}>
            <LottieView
                source={require('../../assets/animated_Icon/SuccessAnimation.json')}  // Replace with your success Lottie animation path
                autoPlay
                loop={false}
                style={styles.lottie}
                speed={1.2}
            />
            <Text style={[styles.text, { color: textColor }]}>{message}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: wp(87),
        height: hp(6.8),
        paddingHorizontal: wp(4),
        borderRadius: wp(4),
            // backgroundColor: '#d2f7d2',
            backgroundColor: '#F7F7FC',
        alignItems: 'center',
        flexDirection: 'row',
    },
    text: {
        fontSize: hp(2.3),
        color: 'black',
        fontWeight: '500',
        paddingHorizontal: wp(3)
    },
    lottie: {
        width: wp(8),
        height: hp(4),
    },
});

export default SuccessToast;
