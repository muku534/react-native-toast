import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from '../utils/Pixel/Index';

const EmojiToast = ({ message, emoji, theme = 'light' }) => {
    const isDark = theme === 'dark';
    const bg = isDark ? '#111827' : '#FFFFFF';
    const textColor = isDark ? '#F3F4F6' : '#1F2937';

    return (
        <View style={[styles.emojiToast, { backgroundColor: bg }]}>
            <Text style={styles.emoji}>{emoji}</Text>
            <Text style={[styles.text, { color: textColor }]} numberOfLines={2}>
                {message}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    emojiToast: {
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
    emoji: {
        fontSize: hp(2.8),
        marginRight: wp(2),
    },
    text: {
        fontSize: hp(1.85),
        color: '#1F2937',
        fontWeight: '500',
        flex: 1,
        lineHeight: hp(2.4),
    },
});

export default EmojiToast;