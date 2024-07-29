import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from '../utils/Pixel/Index';

const CustomToast = ({ content }) => {
    return (
        <View style={styles.customToast}>
            {content}
        </View>
    );
};

const styles = StyleSheet.create({
    customToast: {
        padding: wp(2),
        borderRadius: wp(2),
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default CustomToast;
