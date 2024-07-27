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

    const success = (message, options) => {
        show(<SuccessToast message={message} />, options);
    };

    const error = (message, options) => {
        show(<ErrorToast message={message} />, options);
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

    const emoji = (message, emoji, options) => {
        show(<EmojiToast message={message} emoji={emoji} />, options);
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
