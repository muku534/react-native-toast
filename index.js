// Fixed index.js - Simplified export structure
const useToastModule = require('./src/hooks/useToast');
const ToastModule = require('./src/Toast');
const ToastContainerModule = require('./src/context/ToastContainer');
const SuccessToastModule = require('./src/components/SuccessToast');
const CustomeToastModule = require('./src/components/CustomeToast');
const EmojiToastModule = require('./src/components/EmojiToast');
const ErrorToastModule = require('./src/components/ErrorToast');
const LoadingToastModule = require('./src/components/LoadingToast');

// Extract default exports properly
const useToast = useToastModule.default || useToastModule;
const Toast = ToastModule.default || ToastModule;
const ToastContainer = ToastContainerModule.default || ToastContainerModule;
const SuccessToast = SuccessToastModule.default || SuccessToastModule;
const CustomeToast = CustomeToastModule.default || CustomeToastModule;
const EmojiToast = EmojiToastModule.default || EmojiToastModule;
const ErrorToast = ErrorToastModule.default || ErrorToastModule;
const LoadingToast = LoadingToastModule.default || LoadingToastModule;

// Primary default export
module.exports = useToast;

// Named exports
module.exports.useToast = useToast;
module.exports.Toast = Toast;
module.exports.ToastContainer = ToastContainer;
module.exports.SuccessToast = SuccessToast;
module.exports.CustomeToast = CustomeToast;
module.exports.EmojiToast = EmojiToast;
module.exports.ErrorToast = ErrorToast;
module.exports.LoadingToast = LoadingToast;

// Also support default property for ES6 imports
module.exports.default = useToast;