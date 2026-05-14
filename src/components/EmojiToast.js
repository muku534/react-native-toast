import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
} from 'react-native-reanimated';
import {
    widthPercentageToDP as wp,
} from '../utils/Pixel/Index';
import { TOAST_THEME } from '../utils/theme';
import ProgressBar from './ProgressBar';

/**
 * EmojiToast — Toast with an emoji and bounce animation.
 * Styled to match the premium design system.
 */
const EmojiToast = ({ title, message, emoji, theme = 'light', duration }) => {
    const isDark = theme === 'dark';
    const themeColors = TOAST_THEME[isDark ? 'dark' : 'light'];
    const emojiScale = useSharedValue(0.3);

    useEffect(() => {
        emojiScale.value = withSpring(1, { damping: 8, stiffness: 200 });
    }, []);

    const emojiAnimStyle = useAnimatedStyle(() => ({
        transform: [{ scale: emojiScale.value }],
    }));

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: themeColors.background,
                    borderColor: themeColors.border,
                    ...Platform.select({
                        ios: {
                            shadowColor: themeColors.shadow,
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: isDark ? 0.4 : 0.08,
                            shadowRadius: 12,
                        },
                        android: {
                            elevation: 6,
                        },
                    }),
                },
            ]}
            accessibilityRole="alert"
            accessibilityLiveRegion="polite"
            accessibilityLabel={[emoji, title, message].filter(Boolean).join('. ')}
        >
            <View style={styles.body}>
                <Animated.View style={[styles.emojiBadge, emojiAnimStyle]}>
                    <Text style={styles.emojiText}>{emoji}</Text>
                </Animated.View>
                <View style={styles.textContainer}>
                    {title ? (
                        <Text
                            style={[styles.title, { color: themeColors.title }]}
                            numberOfLines={1}
                        >
                            {title}
                        </Text>
                    ) : null}
                    {message ? (
                        <Text
                            style={[
                                styles.message,
                                { color: themeColors.message },
                                !title && styles.messageSolo,
                            ]}
                            numberOfLines={2}
                        >
                            {message}
                        </Text>
                    ) : null}
                </View>
            </View>
            {duration && duration !== Infinity && (
                <ProgressBar
                    duration={duration}
                    color="#8B5CF6"
                    trackColor={themeColors.progressTrack}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: wp(92),
        borderRadius: 16,
        overflow: 'hidden',
        borderWidth: 1,
    },
    body: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 14,
    },
    emojiBadge: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    emojiText: {
        fontSize: 22,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 15,
        fontWeight: '600',
        letterSpacing: -0.2,
        lineHeight: 20,
    },
    message: {
        fontSize: 13,
        fontWeight: '400',
        marginTop: 2,
        lineHeight: 18,
        letterSpacing: -0.1,
    },
    messageSolo: {
        fontSize: 14,
        fontWeight: '500',
        lineHeight: 20,
    },
});

export default React.memo(EmojiToast);