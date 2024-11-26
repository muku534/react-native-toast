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
