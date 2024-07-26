import React from 'react';
import { Text } from 'react-native';
import toastManagerInstance from './components/ToastManager';
import LoadingToast from './components/ToastHelpers/LoadingToast';
import SuccessToast from './components/ToastHelpers/SuccessToast';
import ErrorToast from './components/ToastHelpers/ErrorToast';
import CustomToast from './components/ToastHelpers/CustomeToast';
import EmojiToast from './components/ToastHelpers/EmojiToast';


const useToast = () => {
    const show = (content, options) => {
        toastManagerInstance.show(content, options);
    };

    const success = (message) => {
        show(<SuccessToast message={message} />, { duration: 3000, position: 'bottom' });
    };

    const error = (message) => {
        show(<ErrorToast message={message} />, { duration: 3000, position: 'bottom' });
    };

    const promise = (promise, { loading, success, error }) => {
        toastManagerInstance.promise(promise, {
            loading: <LoadingToast message={loading} />,
            success: <SuccessToast message={success} />,
            error: <ErrorToast message={error} />,
        });
    };

    const custom = (content, options) => {
        show(<CustomToast content={content} />, options);
    };

    const emoji = (message, emoji) => {
        show(<EmojiToast message={message} emoji={emoji} />, { duration: 3000, position: 'bottom' });
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

export default useToast;
