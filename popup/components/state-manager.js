// State manager for Popup components

class StateManager {
    constructor() {
        this.state = {};
    }

    // Method to set state
    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.render();
    }

    // Method to get the current state
    getState() {
        return this.state;
    }

    // Example render method
    render() {
        console.log('Current State:', this.state);
        // Logic to update the UI based on the current state
    }
}

// Usage Example:
const popupStateManager = new StateManager();
popupStateManager.setState({ isVisible: true });
popupStateManager.setState({ message: 'Hello, World!' });