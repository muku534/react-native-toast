import React, { useContext } from "react";
import { ToastProvider, ToastContext } from "./components/ToastContext";
import SuccessToast from "./components/ToastHelpers/SuccessToast";
import ErrorToast from "./components/ToastHelpers/ErrorToast";
import LoadingToast from "./components/ToastHelpers/LoadingToast";
import CustomToast from "./components/ToastHelpers/CustomeToast";
import EmojiToast from "./components/ToastHelpers/EmojiToast";

const useToast = () => {
    const toastRef = useContext(ToastContext);

    const show = (content, options) => {
        toastRef.current.show(content, options);
    };

    const success = (message) => {
        show(SuccessToast(message), { duration: 3000, position: 'bottom' });
    };

    const error = (message) => {
        show(ErrorToast(message), { duration: 3000, position: 'bottom' });
    };

    const promise = (promise, { loading, success, error }) => {
        toastRef.current.promise(promise, {
            loading: LoadingToast(loading),
            success: SuccessToast(success),
            error: ErrorToast(error),
        });
    };

    const custom = (content, options) => {
        show(CustomToast(content), options);
    };

    const emoji = (message, emoji) => {
        show(EmojiToast(message, emoji), { duration: 3000, position: 'bottom' })
    };

    return {
        show,
        success,
        error,
        promise,
        custom,
        emoji,
    };
};

export { ToastProvider, useToast };