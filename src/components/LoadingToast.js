// src/components/ToastHelpers/LoadingToast.js
import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from '../utils/Pixel/Index';

const LoadingToast = ({ message, theme = 'light' }) => {
    const isDark = theme === 'dark';
    const bg = isDark ? '#111827' : '#FFFFFF';
    const indicatorColor = isDark ? '#9CA3AF' : '#6B7280';

    return (
        <View style={[styles.toast, { backgroundColor: bg }]}>
            <ActivityIndicator size="small" color={indicatorColor} />
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
