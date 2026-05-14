import React from 'react';
import BaseToast from './BaseToast';
import { WarningIcon } from './icons';
import { TOAST_COLORS, TOAST_DEFAULTS } from '../utils/theme';

const WarningToast = ({ title, message, theme = 'light', duration }) => {
    const isDark = theme === 'dark';
    const colors = TOAST_COLORS.warning;

    return (
        <BaseToast
            icon={<WarningIcon size={TOAST_DEFAULTS.iconSize} color={isDark ? colors.iconDark : colors.icon} />}
            title={title || null}
            message={message || null}
            accentColor={colors.accent}
            toastType="warning"
            theme={theme}
            duration={duration}
        />
    );
};

export default React.memo(WarningToast);
