/**
 * rn-toastify — Premium Design Tokens
 * Inspired by iOS system notifications and Material Design 3
 */

export const TOAST_COLORS = {
    success: {
        accent: '#22C55E',
        accentSoft: '#DCFCE7',
        accentSoftDark: 'rgba(34, 197, 94, 0.15)',
        iconBg: '#DCFCE7',
        iconBgDark: 'rgba(34, 197, 94, 0.18)',
        icon: '#16A34A',
        iconDark: '#4ADE80',
    },
    error: {
        accent: '#EF4444',
        accentSoft: '#FEE2E2',
        accentSoftDark: 'rgba(239, 68, 68, 0.15)',
        iconBg: '#FEE2E2',
        iconBgDark: 'rgba(239, 68, 68, 0.18)',
        icon: '#DC2626',
        iconDark: '#FCA5A5',
    },
    info: {
        accent: '#3B82F6',
        accentSoft: '#DBEAFE',
        accentSoftDark: 'rgba(59, 130, 246, 0.15)',
        iconBg: '#DBEAFE',
        iconBgDark: 'rgba(59, 130, 246, 0.18)',
        icon: '#2563EB',
        iconDark: '#93C5FD',
    },
    warning: {
        accent: '#F59E0B',
        accentSoft: '#FEF3C7',
        accentSoftDark: 'rgba(245, 158, 11, 0.15)',
        iconBg: '#FEF3C7',
        iconBgDark: 'rgba(245, 158, 11, 0.18)',
        icon: '#D97706',
        iconDark: '#FCD34D',
    },
    loading: {
        accent: '#8B5CF6',
        accentSoft: '#EDE9FE',
        accentSoftDark: 'rgba(139, 92, 246, 0.15)',
        iconBg: '#EDE9FE',
        iconBgDark: 'rgba(139, 92, 246, 0.18)',
        icon: '#7C3AED',
        iconDark: '#C4B5FD',
    },
};

export const TOAST_THEME = {
    light: {
        background: 'rgba(255, 255, 255, 0.96)',
        surface: 'rgba(248, 250, 252, 0.9)',
        title: '#0F172A',
        message: '#475569',
        border: 'rgba(0, 0, 0, 0.04)',
        shadow: 'rgba(100, 116, 139, 0.15)',
        progressTrack: 'rgba(0, 0, 0, 0.05)',
    },
    dark: {
        background: 'rgba(15, 23, 42, 0.96)',
        surface: 'rgba(30, 41, 59, 0.9)',
        title: '#F1F5F9',
        message: '#94A3B8',
        border: 'rgba(255, 255, 255, 0.08)',
        shadow: 'rgba(0, 0, 0, 0.5)',
        progressTrack: 'rgba(255, 255, 255, 0.06)',
    },
};

export const TOAST_DEFAULTS = {
    duration: 3000,
    position: 'top',
    maxVisible: 3,
    iconSize: 22,
    animationDuration: 350,
};
