import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from '../utils/Pixel/Index';

const CustomToast = ({ content, theme = 'light' }) => {
    const isDark = theme === 'dark';
    const bg = isDark ? '#111827' : '#FFFFFF';
    
    return (
        <View style={[styles.customToast, { backgroundColor: bg }]}>
            {content}
        </View>
    );
};

const styles = StyleSheet.create({
    customToast: {
        minHeight: hp(6.5),
        paddingHorizontal: wp(4),
        paddingVertical: hp(1.2),
        borderRadius: wp(3),
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
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
});

export default CustomToast;