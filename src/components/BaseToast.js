import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from '../utils/Pixel/Index';
import { TOAST_THEME, TOAST_COLORS } from '../utils/theme';
import ProgressBar from './ProgressBar';

/**
 * BaseToast — Premium shared layout for all built-in toast types.
 * 
 * Design: Compact card with rounded icon badge, subtle accent,
 * floating shadow, and an edge-to-edge progress indicator.
 */
const BaseToast = ({
    icon,
    title,
    message,
    accentColor,
    toastType = 'info',
    theme = 'light',
    duration,
    showProgress = true,
    children,
}) => {
    const isDark = theme === 'dark';
    const themeColors = TOAST_THEME[isDark ? 'dark' : 'light'];
    const colors = TOAST_COLORS[toastType] || TOAST_COLORS.info;
    const iconBgColor = isDark ? colors.iconBgDark : colors.iconBg;

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
                            shadowOffset: { width: 0, height: 8 },
                            shadowOpacity: isDark ? 0.6 : 1,
                            shadowRadius: 24,
                        },
                        android: {
                            elevation: 8,
                        },
                    }),
                },
            ]}
            accessibilityRole="alert"
            accessibilityLiveRegion="polite"
            accessibilityLabel={
                [title, message].filter(Boolean).join('. ')
            }
        >
            {/* Left Edge Accent */}
            <View style={[styles.leftAccent, { backgroundColor: accentColor || colors.accent }]} />

            {/* Content row */}
            <View style={styles.body}>
                {/* Icon wrapper without the heavy badge background */}
                {icon && (
                    <View style={styles.iconContainer}>
                        {icon}
                    </View>
                )}

                {/* Text content */}
                <View style={styles.textContainer}>
                    {title ? (
                        <Text
                            style={[styles.title, { color: themeColors.title }]}
                            numberOfLines={1}
                            ellipsizeMode="tail"
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
                            ellipsizeMode="tail"
                        >
                            {message}
                        </Text>
                    ) : null}
                    {children}
                </View>
            </View>

            {/* Progress bar — flush to bottom edge */}
            {showProgress && duration && duration !== Infinity && (
                <ProgressBar
                    duration={duration}
                    color={accentColor}
                    trackColor={themeColors.progressTrack}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: wp(88),
        maxWidth: 400,
        borderRadius: 24,
        overflow: 'hidden',
        borderWidth: 1,
    },
    leftAccent: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: 4,
    },
    body: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 14,
        paddingLeft: 20,
    },
    iconContainer: {
        width: 36,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 15,
        fontWeight: '700',
        letterSpacing: -0.2,
        lineHeight: 20,
    },
    message: {
        fontSize: 13,
        fontWeight: '500',
        marginTop: 2,
        lineHeight: 18,
        letterSpacing: -0.1,
    },
    messageSolo: {
        fontSize: 14,
        fontWeight: '600',
        lineHeight: 20,
    },
});

export default React.memo(BaseToast);
