import React from 'react';
import BaseToast from './BaseToast';
import { LoadingSpinner } from './icons';
import { TOAST_COLORS, TOAST_DEFAULTS } from '../utils/theme';

const LoadingToast = ({ title, message, theme = 'light', duration }) => {
    const isDark = theme === 'dark';
    const colors = TOAST_COLORS.loading;

    return (
        <BaseToast
            icon={<LoadingSpinner size={TOAST_DEFAULTS.iconSize - 2} color={isDark ? colors.iconDark : colors.icon} />}
            title={title || null}
            message={message || null}
            accentColor={colors.accent}
            toastType="loading"
            theme={theme}
            duration={duration}
            showProgress={false}
        />
    );
};

export default React.memo(LoadingToast);