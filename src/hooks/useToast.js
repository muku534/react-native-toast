import React from 'react';
import toastManagerInstance from '../context/ToastManager';
import LoadingToast from '../components/LoadingToast';
import SuccessToast from '../components/SuccessToast';
import ErrorToast from '../components/ErrorToast';
import InfoToast from '../components/InfoToast';
import WarningToast from '../components/WarningToast';
import CustomToast from '../components/CustomToast';
import EmojiToast from '../components/EmojiToast';

/**
 * useToast — imperative hook to show toast notifications from anywhere.
 *
 * @returns {{
 *   show: (content: React.ReactNode, options?: Object) => string,
 *   success: (message: string, options?: Object) => string,
 *   error: (message: string, options?: Object) => string,
 *   info: (message: string, options?: Object) => string,
 *   warning: (message: string, options?: Object) => string,
 *   promise: (promise: Promise, messages: Object, options?: Object) => Promise,
 *   custom: (content: React.ReactNode, options?: Object) => string,
 *   emoji: (message: string, emoji: string, options?: Object) => string,
 *   dismiss: (id: string) => void,
 *   dismissAll: () => void,
 *   update: (id: string, content: React.ReactNode, options?: Object) => void,
 *   isActive: (id: string) => boolean,
 * }}
 */
const useToast = () => {
    const show = (content, options) => {
        return toastManagerInstance.show(content, options);
    };

    const success = (message, options) => {
        const { title, ...rest } = options || {};
        return show(<SuccessToast title={title} message={message} />, rest);
    };

    const error = (message, options) => {
        const { title, ...rest } = options || {};
        return show(<ErrorToast title={title} message={message} />, rest);
    };

    const info = (message, options) => {
        const { title, ...rest } = options || {};
        return show(<InfoToast title={title} message={message} />, rest);
    };

    const warning = (message, options) => {
        const { title, ...rest } = options || {};
        return show(<WarningToast title={title} message={message} />, rest);
    };

    const promise = (promiseValue, { loading, success: successMsg, error: errorMsg }, options) => {
        return toastManagerInstance.promise(
            promiseValue,
            {
                loading: typeof loading === 'string'
                    ? <LoadingToast message={loading} />
                    : loading,
                success: typeof successMsg === 'string'
                    ? <SuccessToast message={successMsg} />
                    : typeof successMsg === 'function'
                        ? (result) => {
                            const msg = successMsg(result);
                            return typeof msg === 'string' ? <SuccessToast message={msg} /> : msg;
                        }
                        : successMsg,
                error: typeof errorMsg === 'string'
                    ? <ErrorToast message={errorMsg} />
                    : typeof errorMsg === 'function'
                        ? (err) => {
                            const msg = errorMsg(err);
                            return typeof msg === 'string' ? <ErrorToast message={msg} /> : msg;
                        }
                        : errorMsg,
            },
            options
        );
    };

    const custom = (content, options) => {
        return show(<CustomToast content={content} />, options);
    };

    const emoji = (message, emojiChar, options) => {
        const { title, ...rest } = options || {};
        return show(<EmojiToast title={title} message={message} emoji={emojiChar} />, rest);
    };

    const dismiss = (id) => {
        toastManagerInstance.remove(id);
    };

    const dismissAll = () => {
        toastManagerInstance.dismissAll();
    };

    const update = (id, content, options) => {
        toastManagerInstance.update(id, content, options);
    };

    const isActive = (id) => {
        return toastManagerInstance.isActive(id);
    };

    return {
        show,
        success,
        error,
        info,
        warning,
        promise,
        custom,
        emoji,
        dismiss,
        dismissAll,
        update,
        isActive,
    };
};

export default useToast;
