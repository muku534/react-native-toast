import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from '../utils/Pixel/Index';

const EmojiToast = ({ message, emoji, theme = 'light' }) => {
    const isDark = theme === 'dark';
    const bg = isDark ? '#111827' : '#F7F7FC';
    const textColor = isDark ? '#F3F4F6' : 'black';

    return (
        <View style={[styles.emojiToast, { backgroundColor: bg }]}>
            <Text style={[styles.text, { color: textColor }]}>{emoji} {message}</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    emojiToast: {
        width: wp(87),
        height: hp(6.8),
        paddingHorizontal: wp(4),
        borderRadius: wp(4),
        // backgroundColor: '#d2f7d2',
        backgroundColor: '#F7F7FC',
        alignItems: 'center',
        flexDirection: 'row',

    },
    text: {
        fontSize: hp(2.2),
        color: 'black',
        paddingHorizontal: wp(1.5)
    },
});

export default EmojiToast;
