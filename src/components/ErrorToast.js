// src/components/ToastHelpers/ErrorToast.js
import LottieView from 'lottie-react-native';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from '../utils/Pixel/Index';

const ErrorToast = ({ message, theme = 'light' }) => {
    const isDark = theme === 'dark';
    const containerBg = isDark ? '#111827' : '#F7F7FC';
    const textColor = isDark ? '#FEE2E2' : '#991B1B';

    return (
        <View style={[styles.container, { backgroundColor: containerBg }]}>
            <LottieView
                source={require('../../assets/animated_Icon/ErrorAnimation.json')}  // Replace with your success Lottie animation path
                autoPlay
                loop={false}
                speed={1.5}
                style={styles.lottie}
            />
            <Text style={[styles.text, { color: textColor }]}>{message}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: wp(87),
        height: hp(6.8),
        paddingHorizontal: wp(4),
        borderRadius: wp(4),
        // backgroundColor: '#f8c4c4',
        backgroundColor: '#F7F7FC',
        alignItems: 'center',
        flexDirection: 'row'
    },
    text: {
        fontSize: hp(2.3),
        color: 'black',
        fontWeight: '500',
        paddingHorizontal: wp(3)
    },
    lottie: {
        width: wp(8.5),
        height: hp(4.5),
    },
});

export default ErrorToast;
