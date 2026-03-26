// Content script - 提取網頁內容
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getPageContent') {
        try {
            const text = document.body.innerText || '';
            sendResponse({ content: text });
        } catch (error) {
            sendResponse({ content: '', error: error.message });
        }
    }
});
