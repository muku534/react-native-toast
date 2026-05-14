import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import {
    widthPercentageToDP as wp,
} from '../utils/Pixel/Index';
import { TOAST_THEME } from '../utils/theme';

/**
 * CustomToast — Wrapper for user-provided custom content.
 * Matches the premium design system card style.
 */
const CustomToast = ({ content, theme = 'light' }) => {
    const isDark = theme === 'dark';
    const themeColors = TOAST_THEME[isDark ? 'dark' : 'light'];

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
        >
            {content}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: wp(88),
        maxWidth: 400,
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderRadius: 24,
        overflow: 'hidden',
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
    },
});

export default CustomToast;
