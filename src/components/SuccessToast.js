import LottieView from 'lottie-react-native';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from '../utils/Pixel/Index';

const SuccessToast = ({ message, theme = 'light' }) => {
    const isDark = theme === 'dark';
    const containerBg = isDark ? '#111827' : '#FFFFFF';
    const textColor = isDark ? '#F3F4F6' : '#1F2937';

    return (
        <View style={[styles.container, { backgroundColor: containerBg }]}>
            <LottieView
                source={require('../../assets/animated_Icon/SuccessAnimation.json')}
                autoPlay
                loop={false}
                style={styles.lottie}
                speed={1.2}
            />
            <Text style={[styles.text, { color: textColor }]} numberOfLines={2}>
                {message}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: wp(87),
        minHeight: hp(6.5),
        paddingHorizontal: wp(4),
        paddingVertical: hp(1.2),
        borderRadius: wp(3),
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        flexDirection: 'row',
        // Shadow for iOS
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        // Shadow for Android
        elevation: 6,
    },
    text: {
        fontSize: hp(1.85),
        color: '#1F2937',
        fontWeight: '500',
        paddingHorizontal: wp(2.5),
        flex: 1,
        lineHeight: hp(2.4),
    },
    lottie: {
        width: wp(7),
        height: hp(3.5),
    },
});

export default SuccessToast;