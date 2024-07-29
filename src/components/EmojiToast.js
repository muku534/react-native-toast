// src/components/ToastHelpers/EmojiToast.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from '../utils/Pixel/Index';

const EmojiToast = ({ message, emoji }) => {
    return (
        <View style={styles.emojiToast}>
            <Text style={styles.text}>{emoji} {message}</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    emojiToast: {
        // padding: wp(2),
        height: hp(5),
        borderRadius: wp(2),
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',

    },
    text: {
        fontSize: hp(2.2),
        color: 'black',
        paddingHorizontal: wp(1.5)
    },
});

export default EmojiToast;
