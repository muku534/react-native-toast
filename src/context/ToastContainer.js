import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Toast from '../Toast';
import toastManagerInstance from './ToastManager';

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

    return (
        <View style={styles.container}>
            {toasts.map((toast, index) => (
                <Toast
                    key={toast.id}
                    visible={true}
                    duration={toast.options.duration}
                    position={toast.options.position}
                    style={[toast.options.style, { top: 0 + index * 60 }]}
                    onHide={() => toastManagerInstance.remove(toast.id)}
                >
                    {toast.content}
                </Toast>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        pointerEvents: 'box-none',
    },
});

export default React.memo(ToastContainer);
