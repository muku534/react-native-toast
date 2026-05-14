import { EventEmitter } from 'events';
import { TOAST_DEFAULTS } from '../utils/theme';

let _idCounter = 0;
const generateId = () => `toast_${++_idCounter}_${Date.now()}`;

class ToastManager extends EventEmitter {
    constructor() {
        super();
        this.setMaxListeners(20);
        this._activeToasts = new Map();
        this._queue = [];
        this._maxVisible = TOAST_DEFAULTS.maxVisible;
    }

    /**
     * Configure the toast manager.
     * @param {{ maxVisible?: number }} config
     */
    configure(config = {}) {
        if (config.maxVisible !== undefined) {
            this._maxVisible = config.maxVisible;
        }
    }

    /**
     * Show a toast notification.
     * @param {React.ReactNode} content - The toast content to render
     * @param {Object} options - Toast options (duration, position, style)
     * @param {string|null} id - Optional custom ID for the toast
     * @returns {string} The toast ID
     */
    show(content, options = {}, id = null) {
        const _id = id ?? generateId();
        const defaultOptions = {
            duration: TOAST_DEFAULTS.duration,
            position: TOAST_DEFAULTS.position,
            style: {},
        };

        const toast = {
            id: _id,
            content,
            options: { ...defaultOptions, ...options },
            createdAt: Date.now(),
        };

        // If we've hit the max, queue the toast or dismiss the oldest
        if (this._activeToasts.size >= this._maxVisible) {
            // Remove the oldest toast to make room
            const oldest = this._activeToasts.keys().next().value;
            if (oldest) {
                this.remove(oldest);
            }
        }

        this._activeToasts.set(_id, toast);
        this.emit('show', toast);
        return _id;
    }

    /**
     * Remove a toast by ID.
     * @param {string} id
     */
    remove(id) {
        this._activeToasts.delete(id);
        this.emit('remove', id);

        // Process queue if there are waiting toasts
        if (this._queue.length > 0 && this._activeToasts.size < this._maxVisible) {
            const next = this._queue.shift();
            if (next) {
                this.show(next.content, next.options, next.id);
            }
        }
    }

    /**
     * Dismiss all active toasts.
     */
    dismissAll() {
        const ids = Array.from(this._activeToasts.keys());
        ids.forEach((id) => this.remove(id));
        this._queue = [];
    }

    /**
     * Update an existing toast's content.
     * @param {string} id - The toast ID to update
     * @param {React.ReactNode} content - New content
     * @param {Object} options - New options (merged with existing)
     */
    update(id, content, options = {}) {
        if (this._activeToasts.has(id)) {
            const existing = this._activeToasts.get(id);
            const updated = {
                ...existing,
                content: content ?? existing.content,
                options: { ...existing.options, ...options },
            };
            this._activeToasts.set(id, updated);
            this.emit('update', updated);
        }
    }

    /**
     * Check if a toast is currently active.
     * @param {string} id
     * @returns {boolean}
     */
    isActive(id) {
        return this._activeToasts.has(id);
    }

    /**
     * Handle promise states with loading → success/error toasts.
     * @param {Promise} promise
     * @param {{ loading: React.ReactNode, success: React.ReactNode|Function, error: React.ReactNode|Function }} messages
     * @param {Object} options
     */
    async promise(promise, { loading, success, error }, options = {}) {
        const id = generateId();
        // Show the loading toast
        this.show(loading, { ...options, duration: Infinity, position: options.position || 'top' }, id);

        try {
            const result = await promise;
            this.remove(id);
            // Support function callbacks for dynamic messages
            const successContent = typeof success === 'function' ? success(result) : success;
            this.show(successContent, {
                duration: options.successDuration || TOAST_DEFAULTS.duration,
                position: options.position || 'top',
            });
            return result;
        } catch (err) {
            this.remove(id);
            const errorContent = typeof error === 'function' ? error(err) : error;
            this.show(errorContent, {
                duration: options.errorDuration || TOAST_DEFAULTS.duration,
                position: options.position || 'top',
            });
            throw err;
        }
    }
}

const toastManagerInstance = new ToastManager();
export default toastManagerInstance;
