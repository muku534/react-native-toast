import React from 'react';
import { Text, StyleSheet } from 'react-native';
import BaseToast from './BaseToast';

/**
 * EmojiToast — Toast with an emoji badge and smooth morphing capsule.
 */
const EmojiToast = ({ title, message, emoji, theme = 'light', duration, expandProgress }) => {
    return (
        <BaseToast
            icon={<Text style={styles.emoji}>{emoji}</Text>}
            title={title || null}
            message={message || null}
            accentColor="#EC4899"
            toastType="emoji"
            theme={theme}
            duration={duration}
            expandProgress={expandProgress}
        />
    );
};

const styles = StyleSheet.create({
    emoji: {
        fontSize: 20,
    },
});

export default React.memo(EmojiToast);