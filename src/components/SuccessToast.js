import LottieView from 'lottie-react-native';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from '../utils/Pixel/Index';

const SuccessToast = ({ message }) => {
    return (
        <View style={styles.container}>
            <LottieView
                source={require('../../../assets/AnimatedIcons/SuccessAnimation.json')}  // Replace with your success Lottie animation path
                autoPlay
                loop={false}
                style={styles.lottie}
                speed={1.5}
            />
            <Text style={styles.text}>{message}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // height: hp(5),
        // width: wp(57),
        // padding: wp(0.2),
        height: hp(5),
        paddingHorizontal: wp(1),
        borderRadius: wp(2),
        backgroundColor: '#d2f7d2',  // Success color (green)
        alignItems: 'center',
        flexDirection: 'row',

    },
    text: {
        fontSize: hp(2.1),
        color: 'black',
        paddingHorizontal: wp(1.5)
    },
    lottie: {
        width: wp(8),
        height: hp(4),
    },
});

export default SuccessToast;
