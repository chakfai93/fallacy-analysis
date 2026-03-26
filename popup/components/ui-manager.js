// ui-manager.js

// UI Manager for handling popup components in the application

class UIManager {
    constructor() {
        this.popups = [];
    }

    // Method to open a popup
    openPopup(popup) {
        this.popups.push(popup);
        popup.show();
    }

    // Method to close a popup
    closePopup(popup) {
        this.popups = this.popups.filter(p => p !== popup);
        popup.hide();
    }

    // Method to close all popups
    closeAllPopups() {
        this.popups.forEach(popup => popup.hide());
        this.popups = [];
    }
}

export default UIManager;