import React from 'react';
import BaseToast from './BaseToast';
import { CrossIcon } from './icons';
import { TOAST_COLORS, TOAST_DEFAULTS } from '../utils/theme';

const ErrorToast = ({ title, message, theme = 'light', duration, expandProgress }) => {
    const isDark = theme === 'dark';
    const colors = TOAST_COLORS.error;

    return (
        <BaseToast
            icon={<CrossIcon size={TOAST_DEFAULTS.iconSize} color={isDark ? colors.iconDark : colors.icon} />}
            title={title || null}
            message={message || null}
            accentColor={colors.accent}
            toastType="error"
            theme={theme}
            duration={duration}
            expandProgress={expandProgress}
        />
    );
};

export default React.memo(ErrorToast);