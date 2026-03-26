// message-handler.js

// Listener for incoming messages from other parts of the Chrome extension
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // Handle the request based on its type
    switch (request.type) {
        case 'exampleType':
            // Process request of type 'exampleType'
            sendResponse({status: 'success', message: 'Handled exampleType'});
            break;
        // Additional cases can be added here
        default:
            sendResponse({status: 'error', message: 'Unknown request type'});
    }
});
