// src/components/ToastHelpers/ErrorToast.js
import LottieView from 'lottie-react-native';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from '../utils/Pixel/Index';

const ErrorToast = ({ message }) => {
    return (
        <View style={styles.container}>
            <LottieView
                source={require('../../assets/animated_Icon/ErrorAnimation.json')}  // Replace with your success Lottie animation path
                autoPlay
                loop={false}
                speed={1.5}
                style={styles.lottie}
            />
            <Text style={styles.text}>{message}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: wp(74),
        height: hp(6),
        paddingHorizontal: wp(4),
        borderRadius: wp(3),
        backgroundColor: '#f8c4c4',
        alignItems: 'center',
        flexDirection: 'row'

    },
    text: {
        fontSize: hp(2.3),
        color: 'black',
        paddingHorizontal: wp(1.5)
    },
    lottie: {
        width: wp(8.5),
        height: hp(4.5),
    },
});

export default ErrorToast;
