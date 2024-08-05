import React from 'react';
import toastManagerInstance from '../context/ToastManager';
import LoadingToast from '../components/LoadingToast';
import SuccessToast from '../components/SuccessToast';
import ErrorToast from '../components/ErrorToast';
import CustomToast from '../components/CustomeToast';
import EmojiToast from '../components/EmojiToast';


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
