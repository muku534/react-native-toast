import React from 'react';
import BaseToast from './BaseToast';
import { CheckIcon } from './icons';
import { TOAST_COLORS, TOAST_DEFAULTS } from '../utils/theme';

const SuccessToast = ({ title, message, theme = 'light', duration }) => {
    const isDark = theme === 'dark';
    const colors = TOAST_COLORS.success;

    return (
        <BaseToast
            icon={<CheckIcon size={TOAST_DEFAULTS.iconSize} color={isDark ? colors.iconDark : colors.icon} />}
            title={title || null}
            message={message || null}
            accentColor={colors.accent}
            toastType="success"
            theme={theme}
            duration={duration}
        />
    );
};

export default React.memo(SuccessToast);