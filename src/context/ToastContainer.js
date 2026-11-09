import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { View, StyleSheet, Appearance, Platform, Keyboard } from 'react-native';
import Toast from '../Toast';
import toastManagerInstance from './ToastManager';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from '../utils/Pixel/Index';

const ToastContainer = ({
    theme: forcedTheme,
    maxVisible = 10,
    defaultPosition = 'top',
    topOffset = 0,
    bottomOffset = 0,
    swipeable = true,
} = {}) => {
    const [toasts, setToasts] = useState([]);
    const [dismissingIds, setDismissingIds] = useState(() => new Set());
    const [systemTheme, setSystemTheme] = useState(() => Appearance?.getColorScheme?.() || 'light');
    const [keyboardHeight, setKeyboardHeight] = useState(0);

    // Active theme resolves forcedTheme (if given and not 'auto') or systemTheme
    const activeTheme = (forcedTheme && forcedTheme !== 'auto') ? forcedTheme : systemTheme;

    useEffect(() => {
        // Configure the manager with our settings
        toastManagerInstance.configure({ maxVisible });
    }, [maxVisible]);

    useEffect(() => {
        const handleShow = (toast) => {
            setToasts((prev) => {
                // Prevent duplicate IDs
                const filtered = prev.filter((t) => t.id !== toast.id);
                return [...filtered, toast];
            });
            // Ensure newly shown toast is not in dismissing set
            setDismissingIds((prev) => {
                if (!prev.has(toast.id)) return prev;
                const next = new Set(prev);
                next.delete(toast.id);
                return next;
            });
        };

        const handleDismiss = (id) => {
            setDismissingIds((prev) => new Set(prev).add(id));
        };

        const handleRemove = (id) => {
            setToasts((prev) => prev.filter((toast) => toast.id !== id));
            setDismissingIds((prev) => {
                if (!prev.has(id)) return prev;
                const next = new Set(prev);
                next.delete(id);
                return next;
            });
        };

        const handleUpdate = (updatedToast) => {
            setToasts((prev) =>
                prev.map((t) => (t.id === updatedToast.id ? updatedToast : t))
            );
        };

        toastManagerInstance.on('show', handleShow);
        toastManagerInstance.on('dismiss', handleDismiss);
        toastManagerInstance.on('remove', handleRemove);
        toastManagerInstance.on('update', handleUpdate);

        // System appearance listener for automatic dark/light switching
        const appearanceSub = Appearance?.addChangeListener?.(({ colorScheme }) => {
            setSystemTheme(colorScheme || 'light');
        });

        // Keyboard listener for bottom toasts
        const keyboardShowSub = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
            (e) => setKeyboardHeight(e.endCoordinates.height)
        );
        const keyboardHideSub = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
            () => setKeyboardHeight(0)
        );

        return () => {
            toastManagerInstance.off('show', handleShow);
            toastManagerInstance.off('dismiss', handleDismiss);
            toastManagerInstance.off('remove', handleRemove);
            toastManagerInstance.off('update', handleUpdate);
            appearanceSub?.remove?.();
            keyboardShowSub.remove();
            keyboardHideSub.remove();
        };
    }, []);

    // Calculate safe top margin
    const getTopMargin = useCallback(() => {
        if (Platform.OS === 'android') {
            // Use StatusBar height if available
            try {
                const { StatusBar } = require('react-native');
                return (StatusBar.currentHeight || 0) + topOffset;
            } catch {
                return topOffset;
            }
        }
        // iOS: default safe area
        return 50 + topOffset;
    }, [topOffset]);

    // Separate toasts by position
    const { topToasts, centerToasts, bottomToasts } = useMemo(() => {
        const top = [];
        const center = [];
        const bottom = [];

        toasts.forEach((toast) => {
            const pos = toast?.options?.position || defaultPosition;
            if (pos === 'top') top.push(toast);
            else if (pos === 'center') center.push(toast);
            else bottom.push(toast);
        });

        return { topToasts: top, centerToasts: center, bottomToasts: bottom };
    }, [toasts, defaultPosition]);

    const topMargin = getTopMargin();
    const toastSpacing = 10;
    const toastHeight = 56;

    const handleToastHide = useCallback((id) => {
        toastManagerInstance.remove(id);
    }, []);

    return (
        <>
            {/* Top positioned toasts */}
            {topToasts.length > 0 && (
                <View
                    style={[styles.topContainer, { top: topMargin }]}
                    pointerEvents="box-none"
                >
                    {topToasts.map((toast, index) => (
                        <Toast
                            key={toast.id}
                            visible={!dismissingIds.has(toast.id)}
                            duration={toast?.options?.duration}
                            position="top"
                            stackIndex={index}
                            stackSpacing={toastHeight + toastSpacing}
                            theme={toast?.options?.theme || activeTheme}
                            style={toast?.options?.style || {}}
                            onHide={() => handleToastHide(toast.id)}
                        >
                            {toast.content}
                        </Toast>
                    ))}
                </View>
            )}

            {/* Center positioned toasts */}
            {centerToasts.length > 0 && (
                <View style={styles.centerContainer} pointerEvents="box-none">
                    {centerToasts.map((toast, index) => (
                        <Toast
                            key={toast.id}
                            visible={!dismissingIds.has(toast.id)}
                            duration={toast?.options?.duration}
                            position="center"
                            stackIndex={index}
                            stackSpacing={toastHeight + toastSpacing}
                            theme={toast?.options?.theme || activeTheme}
                            style={toast?.options?.style || {}}
                            onHide={() => handleToastHide(toast.id)}
                        >
                            {toast.content}
                        </Toast>
                    ))}
                </View>
            )}

            {/* Bottom positioned toasts */}
            {bottomToasts.length > 0 && (
                <View
                    style={[
                        styles.bottomContainer,
                        { bottom: bottomOffset + keyboardHeight },
                    ]}
                    pointerEvents="box-none"
                >
                    {bottomToasts.map((toast, index) => (
                        <Toast
                            key={toast.id}
                            visible={!dismissingIds.has(toast.id)}
                            duration={toast?.options?.duration}
                            position="bottom"
                            stackIndex={index}
                            stackSpacing={toastHeight + toastSpacing}
                            theme={toast?.options?.theme || activeTheme}
                            style={[
                                toast?.options?.style || {},
                                { bottom: hp(2) },
                            ]}
                            onHide={() => handleToastHide(toast.id)}
                        >
                            {toast.content}
                        </Toast>
                    ))}
                </View>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    topContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        zIndex: 9999,
        pointerEvents: 'box-none',
        alignItems: 'center',
    },
    centerContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        pointerEvents: 'box-none',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        pointerEvents: 'box-none',
        alignItems: 'center',
    },
});

export default React.memo(ToastContainer);