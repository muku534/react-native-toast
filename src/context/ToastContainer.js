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
    maxVisible = 3,
    defaultPosition = 'top',
    topOffset = 0,
    bottomOffset = 0,
    swipeable = true,
} = {}) => {
    const [toasts, setToasts] = useState([]);
    const [theme, setTheme] = useState(forcedTheme ?? (Appearance?.getColorScheme?.() || 'light'));
    const [keyboardHeight, setKeyboardHeight] = useState(0);

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
        };

        const handleRemove = (id) => {
            setToasts((prev) => prev.filter((toast) => toast.id !== id));
        };

        const handleUpdate = (updatedToast) => {
            setToasts((prev) =>
                prev.map((t) => (t.id === updatedToast.id ? updatedToast : t))
            );
        };

        toastManagerInstance.on('show', handleShow);
        toastManagerInstance.on('remove', handleRemove);
        toastManagerInstance.on('update', handleUpdate);

        // Theme listener
        let appearanceSub;
        if (!forcedTheme && Appearance?.addChangeListener) {
            appearanceSub = Appearance.addChangeListener(({ colorScheme }) => {
                setTheme(colorScheme ?? 'light');
            });
        }

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
            toastManagerInstance.off('remove', handleRemove);
            toastManagerInstance.off('update', handleUpdate);
            if (appearanceSub?.remove) appearanceSub.remove();
            keyboardShowSub.remove();
            keyboardHideSub.remove();
        };
    }, [forcedTheme]);

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
    const toastSpacing = hp(1.2);
    const toastHeight = hp(8.5);

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
                            visible={true}
                            duration={toast?.options?.duration}
                            position="top"
                            theme={theme}
                            style={[
                                toast?.options?.style || {},
                                { marginTop: index * (toastHeight + toastSpacing) },
                            ]}
                            onHide={() => toastManagerInstance.remove(toast.id)}
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
                            visible={true}
                            duration={toast?.options?.duration}
                            position="center"
                            theme={theme}
                            style={[
                                toast?.options?.style || {},
                                { marginTop: index * (toastHeight + toastSpacing) },
                            ]}
                            onHide={() => toastManagerInstance.remove(toast.id)}
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
                            visible={true}
                            duration={toast?.options?.duration}
                            position="bottom"
                            theme={theme}
                            style={[
                                toast?.options?.style || {},
                                { bottom: hp(2) + index * (toastHeight + toastSpacing) },
                            ]}
                            onHide={() => toastManagerInstance.remove(toast.id)}
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