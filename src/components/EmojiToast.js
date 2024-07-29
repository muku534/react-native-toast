// src/components/ToastHelpers/EmojiToast.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EmojiToast = ({ message, emoji }) => {
    return (
        <View style={styles.emojiToast}>
            <Text style={styles.text}>{emoji} {message}</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    emojiToast: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: 'purple',
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        color: 'white',
    },
});

export default EmojiToast;
