import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Appearance, StatusBar, Platform, SafeAreaView } from 'react-native';
import Toast from '../Toast';
import toastManagerInstance from './ToastManager';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from '../utils/Pixel/Index';

const ToastContainer = ({ theme: forcedTheme } = {}) => {
    const [toasts, setToasts] = useState([]);
    const [theme, setTheme] = useState(forcedTheme ?? (Appearance.getColorScheme() || 'light'));

    useEffect(() => {
        const handleShow = (toast) => {
            setToasts((prevToasts) => [...prevToasts, toast]);
        };

        const handleRemove = (id) => {
            setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
        };

        toastManagerInstance.on('show', handleShow);
        toastManagerInstance.on('remove', handleRemove);

        let appearanceSub;
        if (!forcedTheme && Appearance && Appearance.addChangeListener) {
            appearanceSub = Appearance.addChangeListener(({ colorScheme }) => {
                setTheme(colorScheme ?? 'light');
            });
        }

        return () => {
            toastManagerInstance.off('show', handleShow);
            toastManagerInstance.off('remove', handleRemove);
            if (appearanceSub && appearanceSub.remove) appearanceSub.remove();
        };
    }, []);

    // Separate toasts by position
    const topToasts = toasts.filter(toast => toast?.options?.position === 'top');
    const centerToasts = toasts.filter(toast => toast?.options?.position === 'center');
    const bottomToasts = toasts.filter(toast => toast?.options?.position === 'bottom');

    return (
        <>
            {/* Top positioned toasts */}
            <SafeAreaView
                style={[
                    styles.topContainer,
                    {
                        top: Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0,
                    },
                ]}
                pointerEvents="box-none"
            >
                {topToasts.map((toast, index) => (
                    <Toast
                        key={toast.id}
                        visible={true}
                        duration={toast?.options?.duration}
                        position="top"
                        theme={theme}
                        style={[toast?.options?.style || {}, { marginTop: index * 60 }]} // Adjust spacing between top toasts
                        onHide={() => toastManagerInstance.remove(toast.id)}
                    >
                        {toast.content}
                    </Toast>
                ))}
            </SafeAreaView>

            {/* Center positioned toasts */}
            <View style={styles.centerContainer} pointerEvents="box-none">
                {centerToasts.map((toast, index) => (
                    <Toast
                        key={toast.id}
                        visible={true}
                        duration={toast?.options?.duration}
                        position="center"
                        theme={theme}
                        style={[toast?.options?.style || {}, { marginTop: index * 60 }]} // Adjust spacing between center toasts
                        onHide={() => toastManagerInstance.remove(toast.id)}
                    >
                        {toast.content}
                    </Toast>
                ))}
            </View>

            {/* Bottom positioned toasts */}
            <View style={styles.bottomContainer} pointerEvents="box-none">
                {bottomToasts.map((toast, index) => (
                    <Toast
                        key={toast.id}
                        visible={true}
                        duration={toast?.options?.duration}
                        position="bottom"
                        theme={theme}
                        style={[toast?.options?.style || {}, { bottom: hp(2) + index * 60 }]} // Adjust spacing between bottom toasts
                        onHide={() => toastManagerInstance.remove(toast.id)}
                    >
                        {toast.content}
                    </Toast>
                ))}
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    topContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        pointerEvents: 'box-none',
        alignItems: 'center',
    },
    centerContainer: {
        position: 'absolute',
        top: '50%',
        bottom: '50%',
        left: 0,
        right: 0,
        zIndex: 9999,
        pointerEvents: 'box-none',
        alignItems: 'center',
        transform: [{ translateY: -30 }] // Center the first toast vertically
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
