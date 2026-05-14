// rn-toastify v2.0.0 — Production-ready toast notifications for React Native
const useToastModule = require('./src/hooks/useToast');
const ToastModule = require('./src/Toast');
const ToastContainerModule = require('./src/context/ToastContainer');
const ToastManagerModule = require('./src/context/ToastManager');
const SuccessToastModule = require('./src/components/SuccessToast');
const ErrorToastModule = require('./src/components/ErrorToast');
const InfoToastModule = require('./src/components/InfoToast');
const WarningToastModule = require('./src/components/WarningToast');
const LoadingToastModule = require('./src/components/LoadingToast');
const EmojiToastModule = require('./src/components/EmojiToast');
const CustomToastModule = require('./src/components/CustomToast');
const BaseToastModule = require('./src/components/BaseToast');
const ProgressBarModule = require('./src/components/ProgressBar');
const themeModule = require('./src/utils/theme');

// Extract default exports properly
const useToast = useToastModule.default || useToastModule;
const Toast = ToastModule.default || ToastModule;
const ToastContainer = ToastContainerModule.default || ToastContainerModule;
const ToastManager = ToastManagerModule.default || ToastManagerModule;
const SuccessToast = SuccessToastModule.default || SuccessToastModule;
const ErrorToast = ErrorToastModule.default || ErrorToastModule;
const InfoToast = InfoToastModule.default || InfoToastModule;
const WarningToast = WarningToastModule.default || WarningToastModule;
const LoadingToast = LoadingToastModule.default || LoadingToastModule;
const EmojiToast = EmojiToastModule.default || EmojiToastModule;
const CustomToast = CustomToastModule.default || CustomToastModule;
const BaseToast = BaseToastModule.default || BaseToastModule;
const ProgressBar = ProgressBarModule.default || ProgressBarModule;

// Primary default export
module.exports = useToast;

// Named exports
module.exports.useToast = useToast;
module.exports.Toast = Toast;
module.exports.ToastContainer = ToastContainer;
module.exports.ToastManager = ToastManager;

// Built-in toast components
module.exports.SuccessToast = SuccessToast;
module.exports.ErrorToast = ErrorToast;
module.exports.InfoToast = InfoToast;
module.exports.WarningToast = WarningToast;
module.exports.LoadingToast = LoadingToast;
module.exports.EmojiToast = EmojiToast;
module.exports.CustomToast = CustomToast;
module.exports.BaseToast = BaseToast;
module.exports.ProgressBar = ProgressBar;

// Theme utilities
module.exports.TOAST_COLORS = themeModule.TOAST_COLORS;
module.exports.TOAST_THEME = themeModule.TOAST_THEME;
module.exports.TOAST_DEFAULTS = themeModule.TOAST_DEFAULTS;

// Backward compatibility aliases
module.exports.CustomeToast = CustomToast;

// ES6 default
module.exports.default = useToast;