import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { View, Text } from "react-native";
import Toast from "./Toast";


const ToastManager = forwardRef((props, ref) => {

    const [toast, setToast] = useState([]);
    const toastId = useRef(0);

    const addToast = (content, options) => {
        const id = toastId.current++;
        setToast([...toast, { id, content, options }]);
        if (options.duration !== Infinity) {
            setTimeout(() => {
                removeToast(id);
            }, options.duration);
        }
    };

    const removeToast = (id) => {
        setToast(toast.filter((toast) => toast.id !== id));
    };

    React.useImperativeHandle(ref, () => ({
        show: (content, options = {}) => {
            const defaultOptions = {
                duration: 3000,
                position: 'bottom',
                style: {}
            };
            addToast(content, { ...defaultOptions, ...options });
        },

        promise: async (promise, { loading, success, error }) => {
            const id = toastId.current++;
            setToast([...toast, {
                id, content: loading, options: { duration: Infinity, position: 'bottom' }
            }]);
            try {
                await promise;
                removeToast(id);
                addToast(success, { duration: 3000, position: 'bottom' });
            } catch (error) {
                removeToast(id);
                addToast(error, { duration: 3000, position: 'bottom' });
            }
        },
    }));

    return (
        <View>
            {toast && (
                <Toast
                    visible={true}
                    duration={toast.options.duration}
                    position={toast.options.position}
                    style={toast.options.style}
                    onHide={() => removeToast(toast.id)}
                >
                    {typeof toast.content === 'string' ? <Text>{toast.content}</Text> : toast.content}
                </Toast>
            )}
        </View>
    );
});

export default ToastManager;
