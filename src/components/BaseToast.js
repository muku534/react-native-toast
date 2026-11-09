import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    interpolate,
    Extrapolation,
} from 'react-native-reanimated';
import {
    widthPercentageToDP as wp,
} from '../utils/Pixel/Index';
import { TOAST_THEME, TOAST_COLORS } from '../utils/theme';

const COLLAPSED_SIZE = 52;
const BORDER_RADIUS = COLLAPSED_SIZE / 2; // 26 -> Perfect circle when collapsed, smooth capsule pill when expanded!
const MAX_EXPANDED_WIDTH = Math.min(wp(92), 390);

/**
 * BaseToast — Ultra-Premium Morphing Island Capsule.
 *
 * Sequence:
 * 1. Enters as a compact 52x52 round circle with a glowing circular icon badge.
 * 2. Fluidly expands horizontally into a sleek glassmorphic capsule, revealing title + message.
 * 3. On dismiss: content fades out, capsule collapses back into the exact 52x52 circle, then exits.
 */
const BaseToast = ({
    icon,
    title,
    message,
    accentColor,
    toastType = 'info',
    theme = 'light',
    expandProgress: parentExpandProgress,
    children,
}) => {
    const isDark = theme === 'dark';
    const themeColors = TOAST_THEME[isDark ? 'dark' : 'light'];
    const colors = TOAST_COLORS[toastType] || TOAST_COLORS.info;

    // Use parent expandProgress if provided (from Toast.js), or fallback to expanded (1)
    const fallbackProgress = useSharedValue(1);
    const expandProgress = parentExpandProgress || fallbackProgress;

    // Gentle icon pop-in animation on initial mount
    const iconScale = useSharedValue(0.7);
    useEffect(() => {
        iconScale.value = withSpring(1, { damping: 18, stiffness: 90, mass: 0.9 });
    }, []);

    const iconAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: iconScale.value }],
    }));

    // Container morphs from 52x52 circle to full-width capsule
    const containerAnimatedStyle = useAnimatedStyle(() => {
        const width = interpolate(
            expandProgress.value,
            [0, 1],
            [COLLAPSED_SIZE, MAX_EXPANDED_WIDTH],
            Extrapolation.CLAMP
        );

        // Smooth concurrent height morph so bottom edge doesn't jump
        const maxHeight = interpolate(
            expandProgress.value,
            [0, 1],
            [COLLAPSED_SIZE, 96],
            Extrapolation.CLAMP
        );

        return {
            width,
            maxHeight,
        };
    });

    // Text content fades in/out smoothly without clipping or horizontal shifting
    const textAnimatedStyle = useAnimatedStyle(() => {
        const opacity = interpolate(
            expandProgress.value,
            [0.45, 0.9],
            [0, 1],
            Extrapolation.CLAMP
        );

        return {
            opacity,
        };
    });

    const ringColor = isDark ? (colors.ringDark || colors.accent) : (colors.ring || colors.accent);
    const iconBgColor = isDark ? colors.iconBgDark : colors.iconBg;
    const resolvedAccent = accentColor || colors.accent;

    return (
        <Animated.View
            style={[
                styles.shadowWrapper,
                {
                    ...Platform.select({
                        ios: {
                            shadowColor: isDark ? '#000000' : themeColors.shadow,
                            shadowOffset: { width: 0, height: 8 },
                            shadowOpacity: isDark ? 0.65 : 0.14,
                            shadowRadius: 18,
                        },
                        android: {
                            elevation: 8,
                        },
                    }),
                },
                containerAnimatedStyle,
            ]}
        >
            <View
                style={[
                    styles.container,
                    {
                        backgroundColor: themeColors.background,
                        borderColor: themeColors.border,
                    },
                ]}
                accessibilityRole="alert"
                accessibilityLiveRegion="polite"
                accessibilityLabel={[title, message].filter(Boolean).join('. ')}
            >
                {/* Content Row */}
                <View style={styles.body}>
                {/* Glowing Circular Icon Badge (Centers perfectly in the 52x52 collapsed circle) */}
                {icon ? (
                    <View style={styles.iconContainer}>
                        <Animated.View
                            style={[
                                styles.iconBadge,
                                {
                                    borderColor: ringColor,
                                    backgroundColor: iconBgColor,
                                    ...Platform.select({
                                        ios: {
                                            shadowColor: resolvedAccent,
                                            shadowOffset: { width: 0, height: 0 },
                                            shadowOpacity: isDark ? 0.45 : 0.25,
                                            shadowRadius: 8,
                                        },
                                        android: {
                                            elevation: 4,
                                        },
                                    }),
                                },
                                iconAnimatedStyle,
                            ]}
                        >
                            {icon}
                        </Animated.View>
                    </View>
                ) : null}

                {/* Text Content */}
                <Animated.View style={[styles.textContainer, textAnimatedStyle]}>
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
                </Animated.View>
            </View>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    shadowWrapper: {
        minHeight: COLLAPSED_SIZE,
        borderRadius: BORDER_RADIUS,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        width: '100%',
        minHeight: COLLAPSED_SIZE,
        borderRadius: BORDER_RADIUS,
        overflow: 'hidden',
        borderWidth: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    body: {
        width: MAX_EXPANDED_WIDTH,
        minHeight: COLLAPSED_SIZE,
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        width: COLLAPSED_SIZE,
        height: COLLAPSED_SIZE,
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },
    iconBadge: {
        width: 36,
        height: 36,
        borderRadius: 18,
        borderWidth: 1.8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textContainer: {
        width: MAX_EXPANDED_WIDTH - COLLAPSED_SIZE,
        justifyContent: 'center',
        paddingVertical: 10,
        paddingRight: 16,
    },
    title: {
        fontSize: 14.5,
        fontWeight: '700',
        letterSpacing: -0.3,
        lineHeight: 19,
    },
    message: {
        fontSize: 12.5,
        fontWeight: '400',
        letterSpacing: -0.15,
        lineHeight: 17,
        marginTop: 1.5,
    },
    messageSolo: {
        fontSize: 13.5,
        fontWeight: '600',
        letterSpacing: -0.2,
        lineHeight: 18,
        marginTop: 0,
    },
});

export default React.memo(BaseToast);
