import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Toast from '../Toast';
import toastManagerInstance from './ToastManager';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from '../utils/Pixel/Index';

const ToastContainer = () => {
    const [toasts, setToasts] = useState([]);

    useEffect(() => {
        const handleShow = (toast) => {
            setToasts((prevToasts) => [...prevToasts, toast]);
        };

        const handleRemove = (id) => {
            setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
        };

        toastManagerInstance.on('show', handleShow);
        toastManagerInstance.on('remove', handleRemove);

        return () => {
            toastManagerInstance.off('show', handleShow);
            toastManagerInstance.off('remove', handleRemove);
        };
    }, []);

    // Separate toasts by position
    const topToasts = toasts.filter(toast => toast.options.position === 'top');
    const centerToasts = toasts.filter(toast => toast.options.position === 'center');
    const bottomToasts = toasts.filter(toast => toast.options.position === 'bottom');

    return (
        <>
            {/* Top positioned toasts */}
            <View style={styles.topContainer}>
                {topToasts.map((toast, index) => (
                    <Toast
                        key={toast.id}
                        visible={true}
                        duration={toast.options.duration}
                        position="top"
                        style={[toast.options.style, { top: hp(0.1) + index * 60 }]} // Adjust spacing between top toasts
                        onHide={() => toastManagerInstance.remove(toast.id)}
                    >
                        {toast.content}
                    </Toast>
                ))}
            </View>

            {/* Center positioned toasts */}
            <View style={styles.centerContainer}>
                {centerToasts.map((toast, index) => (
                    <Toast
                        key={toast.id}
                        visible={true}
                        duration={toast.options.duration}
                        position="center"
                        style={[toast.options.style, { marginTop: index * 60 }]} // Adjust spacing between center toasts
                        onHide={() => toastManagerInstance.remove(toast.id)}
                    >
                        {toast.content}
                    </Toast>
                ))}
            </View>

            {/* Bottom positioned toasts */}
            <View style={styles.bottomContainer}>
                {bottomToasts.map((toast, index) => (
                    <Toast
                        key={toast.id}
                        visible={true}
                        duration={toast.options.duration}
                        position="bottom"
                        style={[toast.options.style, { bottom: hp(2) + index * 60 }]} // Adjust spacing between bottom toasts
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
