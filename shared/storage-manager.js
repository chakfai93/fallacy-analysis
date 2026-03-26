'use strict';

class StorageManager {
    constructor() {
        this.storage = chrome.storage;
    }

    setItem(key, value) {
        return new Promise((resolve, reject) => {
            this.storage.local.set({ [key]: value }, () => {
                if (chrome.runtime.lastError) {
                    return reject(chrome.runtime.lastError);
                }
                resolve();
            });
        });
    }

    getItem(key) {
        return new Promise((resolve, reject) => {
            this.storage.local.get([key], (result) => {
                if (chrome.runtime.lastError) {
                    return reject(chrome.runtime.lastError);
                }
                resolve(result[key]);
            });
        });
    }

    removeItem(key) {
        return new Promise((resolve, reject) => {
            this.storage.local.remove([key], () => {
                if (chrome.runtime.lastError) {
                    return reject(chrome.runtime.lastError);
                }
                resolve();
            });
        });
    }

    clear() {
        return new Promise((resolve, reject) => {
            this.storage.local.clear(() => {
                if (chrome.runtime.lastError) {
                    return reject(chrome.runtime.lastError);
                }
                resolve();
            });
        });
    }
}

// Export the StorageManager class
module.exports = StorageManager;