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
    const textColor = isDark ? '#F3F4F6' : '#1F2937';

    return (
        <View style={[styles.toast, { backgroundColor: bg }]}>
            <ActivityIndicator size="small" color={indicatorColor} />
            {message && (
                <Text style={[styles.text, { color: textColor }]} numberOfLines={1}>
                    {message}
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    toast: {
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
    text: {
        fontSize: hp(1.85),
        color: '#1F2937',
        fontWeight: '500',
        marginLeft: wp(3),
        lineHeight: hp(2.4),
    },
});

export default LoadingToast;