import { EventEmitter } from 'events';

class ToastManager extends EventEmitter {
    // show accepts an optional id so callers (like promise) can control the id lifecycle
    show(content, options = {}, id = null) {
        const _id = id ?? Date.now().toString();
        const defaultOptions = {
            duration: 1000,
            position: 'bottom',
            style: {},
        };
        this.emit('show', { id: _id, content, options: { ...defaultOptions, ...options } });
        return _id;
    }

    remove(id) {
        this.emit('remove', id);
    }

    async promise(promise, { loading, success, error }) {
        const id = Date.now().toString();
        // show the loading toast using the same id so we can remove it later
        this.show(loading, { duration: Infinity, position: 'top' }, id);
        try {
            await promise;
            this.remove(id);
            this.show(success, { duration: 1000, position: 'top' });
        } catch (err) {
            this.remove(id);
            this.show(error, { duration: 1000, position: 'top' });
        }
    }
}

const toastManagerInstance = new ToastManager();
export default toastManagerInstance;
