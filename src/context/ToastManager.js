import { EventEmitter } from 'events';

class ToastManager extends EventEmitter {
    show(content, options = {}) {
        const id = Date.now().toString();
        const defaultOptions = {
            duration: 3000,
            position: 'bottom',
            style: {},
        };
        this.emit('show', { id, content, options: { ...defaultOptions, ...options } });
    }

    remove(id) {
        this.emit('remove', id);
    }

    async promise(promise, { loading, success, error }) {
        const id = Date.now().toString();
        this.show(loading, { duration: Infinity, position: 'bottom' });
        try {
            await promise;
            this.remove(id);
            this.show(success, { duration: 3000, position: 'bottom' });
        } catch (err) {
            this.remove(id);
            this.show(error, { duration: 3000, position: 'bottom' });
        }
    }
}

const toastManagerInstance = new ToastManager();
export default toastManagerInstance;
