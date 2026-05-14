import React from 'react';
import BaseToast from './BaseToast';
import { InfoIcon } from './icons';
import { TOAST_COLORS, TOAST_DEFAULTS } from '../utils/theme';

const InfoToast = ({ title, message, theme = 'light', duration }) => {
    const isDark = theme === 'dark';
    const colors = TOAST_COLORS.info;

    return (
        <BaseToast
            icon={<InfoIcon size={TOAST_DEFAULTS.iconSize} color={isDark ? colors.iconDark : colors.icon} />}
            title={title || null}
            message={message || null}
            accentColor={colors.accent}
            toastType="info"
            theme={theme}
            duration={duration}
        />
    );
};

export default React.memo(InfoToast);
