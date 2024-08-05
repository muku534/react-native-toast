// src/components/ToastHelpers/LoadingToast.js
import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from '../utils/Pixel/Index';

const LoadingToast = ({ message }) => {
    return (
        <View style={styles.toast}>
            <ActivityIndicator size="large" color={'#a9a9a9'} />
            {/** <Text style={styles.text}>{message}</Text>  */}
        </View>
    );
}
const styles = StyleSheet.create({
    toast: {
        padding: wp(1),
        borderRadius: wp(10),
        backgroundColor: 'white',
    },
    text: {
        fontSize: hp(2.2),
        color: 'black',
    },
});

export default LoadingToast;
