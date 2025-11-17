 // CommonJS-friendly entry to avoid default/import interop issues with Metro in some RN versions
// We attempt to require modules and use .default if present (handles transpiled ESM)
const _useToastMod = require('./src/hooks/useToast');
const _toastMod = require('./src/Toast');
const _containerMod = require('./src/context/ToastContainer');
const _successMod = require('./src/components/SuccessToast');
const _customeMod = require('./src/components/CustomeToast');
const _emojiMod = require('./src/components/EmojiToast');
const _errorMod = require('./src/components/ErrorToast');
const _loadingMod = require('./src/components/LoadingToast');

const useToast = (_useToastMod && _useToastMod.__esModule) ? _useToastMod.default : _useToastMod;
const Toast = (_toastMod && _toastMod.__esModule) ? _toastMod.default : _toastMod;
const ToastContainer = (_containerMod && _containerMod.__esModule) ? _containerMod.default : _containerMod;
const SuccessToast = (_successMod && _successMod.__esModule) ? _successMod.default : _successMod;
const CustomeToast = (_customeMod && _customeMod.__esModule) ? _customeMod.default : _customeMod;
const EmojiToast = (_emojiMod && _emojiMod.__esModule) ? _emojiMod.default : _emojiMod;
const ErrorToast = (_errorMod && _errorMod.__esModule) ? _errorMod.default : _errorMod;
const LoadingToast = (_loadingMod && _loadingMod.__esModule) ? _loadingMod.default : _loadingMod;

// Export for both require() and import syntax
module.exports = useToast;
module.exports.default = useToast;
module.exports.useToast = useToast;
module.exports.Toast = Toast;
module.exports.ToastContainer = ToastContainer;
module.exports.SuccessToast = SuccessToast;
module.exports.CustomeToast = CustomeToast;
module.exports.EmojiToast = EmojiToast;
module.exports.ErrorToast = ErrorToast;
module.exports.LoadingToast = LoadingToast;