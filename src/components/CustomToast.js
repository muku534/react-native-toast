import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    interpolate,
    Extrapolation,
} from 'react-native-reanimated';
import { widthPercentageToDP as wp } from '../utils/Pixel/Index';
import { TOAST_THEME } from '../utils/theme';

const COLLAPSED_SIZE = 52;
const BORDER_RADIUS = COLLAPSED_SIZE / 2;
const MAX_EXPANDED_WIDTH = Math.min(wp(92), 390);

/**
 * CustomToast — Wrapper for user-provided custom content.
 * Matches the premium morphing capsule design system.
 */
const CustomToast = ({ content, theme = 'light', expandProgress: parentExpandProgress }) => {
    const isDark = theme === 'dark';
    const themeColors = TOAST_THEME[isDark ? 'dark' : 'light'];

    const fallbackProgress = useSharedValue(1);
    const expandProgress = parentExpandProgress || fallbackProgress;

    const containerAnimatedStyle = useAnimatedStyle(() => {
        const width = interpolate(
            expandProgress.value,
            [0, 1],
            [COLLAPSED_SIZE, MAX_EXPANDED_WIDTH],
            Extrapolation.CLAMP
        );
        return {
            width,
        };
    });

    const contentAnimatedStyle = useAnimatedStyle(() => ({
        opacity: interpolate(
            expandProgress.value,
            [0.35, 1],
            [0, 1],
            Extrapolation.CLAMP
        ),
    }));

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    backgroundColor: themeColors.background,
                    borderColor: themeColors.border,
                    ...Platform.select({
                        ios: {
                            shadowColor: isDark ? '#000000' : themeColors.shadow,
                            shadowOffset: { width: 0, height: 10 },
                            shadowOpacity: isDark ? 0.65 : 0.12,
                            shadowRadius: 20,
                        },
                        android: {
                            elevation: 8,
                        },
                    }),
                },
                containerAnimatedStyle,
            ]}
            accessibilityRole="alert"
            accessibilityLiveRegion="polite"
        >
            <Animated.View style={[styles.contentWrap, contentAnimatedStyle]}>
                {content}
            </Animated.View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        minHeight: COLLAPSED_SIZE,
        borderRadius: BORDER_RADIUS,
        overflow: 'hidden',
        borderWidth: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    contentWrap: {
        width: MAX_EXPANDED_WIDTH,
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
});

export default CustomToast;
