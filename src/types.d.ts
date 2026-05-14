import React from 'react';

// ─── Toast Options ───────────────────────────────────────────────────────────

export interface ToastOptions {
    /** Duration in milliseconds before auto-dismiss. Use `Infinity` to persist. Default: 3000 */
    duration?: number;
    /** Position on screen. Default: 'top' */
    position?: 'top' | 'bottom' | 'center';
    /** Custom styles for the toast wrapper */
    style?: object;
    /** Bold title text (displayed above message) */
    title?: string;
}

export interface PromiseMessages<T = any> {
    /** Content to show while the promise is pending */
    loading: string | React.ReactNode;
    /** Content to show on success. Can be a string, element, or function receiving the result */
    success: string | React.ReactNode | ((result: T) => string | React.ReactNode);
    /** Content to show on error. Can be a string, element, or function receiving the error */
    error: string | React.ReactNode | ((error: any) => string | React.ReactNode);
}

export interface PromiseOptions extends Omit<ToastOptions, 'title'> {
    /** Duration for the success toast */
    successDuration?: number;
    /** Duration for the error toast */
    errorDuration?: number;
}

// ─── useToast Hook ───────────────────────────────────────────────────────────

export interface UseToastReturn {
    /** Show a raw toast with custom content */
    show: (content: React.ReactNode, options?: ToastOptions) => string;
    /** Show a success toast with green accent */
    success: (message: string, options?: ToastOptions) => string;
    /** Show an error toast with red accent */
    error: (message: string, options?: ToastOptions) => string;
    /** Show an info toast with blue accent */
    info: (message: string, options?: ToastOptions) => string;
    /** Show a warning toast with amber accent */
    warning: (message: string, options?: ToastOptions) => string;
    /** Handle promise states: loading → success/error */
    promise: <T>(promise: Promise<T>, messages: PromiseMessages<T>, options?: PromiseOptions) => Promise<T>;
    /** Show a toast with custom React content */
    custom: (content: React.ReactNode, options?: Omit<ToastOptions, 'title'>) => string;
    /** Show a toast with an emoji */
    emoji: (message: string, emoji: string, options?: ToastOptions) => string;
    /** Dismiss a specific toast by ID */
    dismiss: (id: string) => void;
    /** Dismiss all active toasts */
    dismissAll: () => void;
    /** Update an existing toast's content */
    update: (id: string, content: React.ReactNode, options?: Partial<ToastOptions>) => void;
    /** Check if a toast with the given ID is currently visible */
    isActive: (id: string) => boolean;
}

declare function useToast(): UseToastReturn;
export default useToast;
export { useToast };

// ─── ToastContainer ──────────────────────────────────────────────────────────

export interface ToastContainerProps {
    /** Force a specific theme. If omitted, follows system preference */
    theme?: 'light' | 'dark';
    /** Maximum number of visible toasts at once. Default: 3 */
    maxVisible?: number;
    /** Default toast position when not specified per-toast. Default: 'top' */
    defaultPosition?: 'top' | 'bottom' | 'center';
    /** Extra offset from the top edge (in addition to safe area). Default: 0 */
    topOffset?: number;
    /** Extra offset from the bottom edge. Default: 0 */
    bottomOffset?: number;
    /** Whether toasts can be swiped to dismiss. Default: true */
    swipeable?: boolean;
}

export declare const ToastContainer: React.FC<ToastContainerProps>;

// ─── Toast Components ────────────────────────────────────────────────────────

export interface ToastComponentProps {
    /** Bold title text */
    title?: string;
    /** Body message text */
    message?: string;
    /** Theme (injected by container, can be overridden) */
    theme?: 'light' | 'dark';
    /** Duration (injected by container for progress bar) */
    duration?: number;
}

export interface EmojiToastProps extends ToastComponentProps {
    /** Emoji character to display */
    emoji?: string;
}

export interface CustomToastProps {
    /** Custom React content to render */
    content?: React.ReactNode;
    /** Theme */
    theme?: 'light' | 'dark';
}

export declare const SuccessToast: React.FC<ToastComponentProps>;
export declare const ErrorToast: React.FC<ToastComponentProps>;
export declare const InfoToast: React.FC<ToastComponentProps>;
export declare const WarningToast: React.FC<ToastComponentProps>;
export declare const LoadingToast: React.FC<ToastComponentProps>;
export declare const EmojiToast: React.FC<EmojiToastProps>;
export declare const CustomToast: React.FC<CustomToastProps>;
export declare const BaseToast: React.FC<any>;
export declare const ProgressBar: React.FC<{
    duration?: number;
    color?: string;
    trackColor?: string;
    paused?: boolean;
}>;

/** @deprecated Use `CustomToast` instead */
export declare const CustomeToast: React.FC<CustomToastProps>;

// ─── Toast animation wrapper ────────────────────────────────────────────────

export declare const Toast: React.FC<{
    visible: boolean;
    duration?: number;
    position?: 'top' | 'bottom' | 'center';
    children: React.ReactNode;
    onHide?: () => void;
    style?: object;
    theme?: 'light' | 'dark';
}>;

// ─── ToastManager (singleton) ────────────────────────────────────────────────

export declare const ToastManager: {
    show: (content: React.ReactNode, options?: ToastOptions, id?: string) => string;
    remove: (id: string) => void;
    dismissAll: () => void;
    update: (id: string, content: React.ReactNode, options?: Partial<ToastOptions>) => void;
    isActive: (id: string) => boolean;
    promise: <T>(promise: Promise<T>, messages: PromiseMessages<T>, options?: PromiseOptions) => Promise<T>;
    configure: (config: { maxVisible?: number }) => void;
};

// ─── Theme Utilities ─────────────────────────────────────────────────────────

export declare const TOAST_COLORS: {
    success: { accent: string; iconBg: string; iconBorder: string; lightText: string; darkText: string; lightSubtext: string; darkSubtext: string };
    error: { accent: string; iconBg: string; iconBorder: string; lightText: string; darkText: string; lightSubtext: string; darkSubtext: string };
    info: { accent: string; iconBg: string; iconBorder: string; lightText: string; darkText: string; lightSubtext: string; darkSubtext: string };
    warning: { accent: string; iconBg: string; iconBorder: string; lightText: string; darkText: string; lightSubtext: string; darkSubtext: string };
    loading: { accent: string; iconBg: string; iconBorder: string; lightText: string; darkText: string; lightSubtext: string; darkSubtext: string };
};

export declare const TOAST_THEME: {
    light: { background: string; title: string; message: string; border: string; shadow: string; progressTrack: string };
    dark: { background: string; title: string; message: string; border: string; shadow: string; progressTrack: string };
};

export declare const TOAST_DEFAULTS: {
    duration: number;
    position: string;
    maxVisible: number;
    iconSize: number;
    animationDuration: number;
};
