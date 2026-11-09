/**
 * rn-toastify — Ultra-Premium Design Tokens
 * Dynamic Island & Glassmorphic Capsule Design System
 */

export const TOAST_COLORS = {
    success: {
        accent: '#22C55E',
        accentSoft: '#DCFCE7',
        accentSoftDark: 'rgba(34, 197, 94, 0.15)',
        iconBg: 'rgba(34, 197, 94, 0.12)',
        iconBgDark: 'rgba(34, 197, 94, 0.18)',
        icon: '#16A34A',
        iconDark: '#4ADE80',
        ring: 'rgba(34, 197, 94, 0.45)',
        ringDark: 'rgba(74, 222, 128, 0.60)',
        glow: 'rgba(34, 197, 94, 0.35)',
    },
    error: {
        accent: '#EF4444',
        accentSoft: '#FEE2E2',
        accentSoftDark: 'rgba(239, 68, 68, 0.15)',
        iconBg: 'rgba(239, 68, 68, 0.12)',
        iconBgDark: 'rgba(239, 68, 68, 0.18)',
        icon: '#DC2626',
        iconDark: '#F87171',
        ring: 'rgba(239, 68, 68, 0.45)',
        ringDark: 'rgba(248, 113, 113, 0.60)',
        glow: 'rgba(239, 68, 68, 0.35)',
    },
    info: {
        accent: '#3B82F6',
        accentSoft: '#DBEAFE',
        accentSoftDark: 'rgba(59, 130, 246, 0.15)',
        iconBg: 'rgba(59, 130, 246, 0.12)',
        iconBgDark: 'rgba(59, 130, 246, 0.18)',
        icon: '#2563EB',
        iconDark: '#60A5FA',
        ring: 'rgba(59, 130, 246, 0.45)',
        ringDark: 'rgba(96, 165, 250, 0.60)',
        glow: 'rgba(59, 130, 246, 0.35)',
    },
    warning: {
        accent: '#F59E0B',
        accentSoft: '#FEF3C7',
        accentSoftDark: 'rgba(245, 158, 11, 0.15)',
        iconBg: 'rgba(245, 158, 11, 0.12)',
        iconBgDark: 'rgba(245, 158, 11, 0.18)',
        icon: '#D97706',
        iconDark: '#FBBF24',
        ring: 'rgba(245, 158, 11, 0.45)',
        ringDark: 'rgba(251, 191, 36, 0.60)',
        glow: 'rgba(245, 158, 11, 0.35)',
    },
    loading: {
        accent: '#8B5CF6',
        accentSoft: '#EDE9FE',
        accentSoftDark: 'rgba(139, 92, 246, 0.15)',
        iconBg: 'rgba(139, 92, 246, 0.12)',
        iconBgDark: 'rgba(139, 92, 246, 0.18)',
        icon: '#7C3AED',
        iconDark: '#C4B5FD',
        ring: 'rgba(139, 92, 246, 0.45)',
        ringDark: 'rgba(196, 181, 253, 0.60)',
        glow: 'rgba(139, 92, 246, 0.35)',
    },
    emoji: {
        accent: '#EC4899',
        accentSoft: '#FCE7F3',
        accentSoftDark: 'rgba(236, 72, 153, 0.15)',
        iconBg: 'rgba(236, 72, 153, 0.12)',
        iconBgDark: 'rgba(236, 72, 153, 0.18)',
        icon: '#DB2777',
        iconDark: '#F472B6',
        ring: 'rgba(236, 72, 153, 0.45)',
        ringDark: 'rgba(244, 114, 182, 0.60)',
        glow: 'rgba(236, 72, 153, 0.35)',
    },
};

export const TOAST_THEME = {
    light: {
        background: 'rgba(255, 255, 255, 0.97)',
        surface: 'rgba(248, 250, 252, 0.95)',
        title: '#0F172A',
        message: '#475569',
        border: 'rgba(0, 0, 0, 0.08)',
        shadow: '#0F172A',
        progressTrack: 'rgba(0, 0, 0, 0.06)',
    },
    dark: {
        background: 'rgba(16, 20, 28, 0.96)',
        surface: 'rgba(24, 30, 42, 0.92)',
        title: '#FFFFFF',
        message: '#94A3B8',
        border: 'rgba(255, 255, 255, 0.12)',
        shadow: '#000000',
        progressTrack: 'rgba(255, 255, 255, 0.08)',
    },
};

export const TOAST_DEFAULTS = {
    duration: 3000,
    position: 'top',
    maxVisible: 10,
    iconSize: 20,
    animationDuration: 350,
};
