import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { View, Text } from "react-native";
import Toast from "./Toast";

const ToastManager = forwardRef((props, ref) => {
    const [toast, setToast] = useState({
        visible: false,
        content: null,
        duration: 3000,
        position: 'bottom',
        style: {},
    });

    useImperativeHandle(ref, () => ({
        show: (content, duration = 3000, position = 'bottom', style = {}) => {
            setToast({
                visible: true,
                content,
                duration,
                position,
                style,
            });
        },
        promise: async (promise, { loading, success, error }) => {
            setToast({
                visible: true,
                content: loading,
                duration: Infinity,
                position: 'bottom',
            });

            try {
                await promise;
                setToast({
                    visible: true,
                    content: success,
                    duration: 3000,
                    position: 'bottom',
                });
            } catch (error) {
                setToast({
                    visible: true,
                    content: error,
                    duration: 3000,
                    position: 'bottom',
                });
            }
        },
    }));

    return (
        <View>
            <Toast
                visible={toast.visible}
                duration={toast.duration}
                position={toast.position}
                style={toast.style}
                onHide={() => setToast({ ...toast, visible: false })}
            >
                {typeof toast.content === 'string' ? <Text>{toast.content}</Text> : toast.content}
            </Toast>
        </View>
    );
});

export default ToastManager;
