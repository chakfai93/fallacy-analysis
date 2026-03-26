// Highlight.js

function highlightPage() {
    const highlighter = document.createElement('div');
    highlighter.style.position = 'fixed';
    highlighter.style.top = '0';
    highlighter.style.left = '0';
    highlighter.style.width = '100%';
    highlighter.style.height = '100%';
    highlighter.style.pointerEvents = 'none';
    highlighter.style.zIndex = '9999';

    document.body.appendChild(highlighter);

    document.addEventListener('mouseover', function(e) {
        const target = e.target;
        if (target && target.nodeType === Node.ELEMENT_NODE) {
            highlighter.style.backgroundColor = 'rgba(255, 255, 0, 0.5)';
            highlighter.style.opacity = '0.5';
            highlighter.style.transition = 'opacity 0.2s';
            highlightElement(target);
        }
    });

    document.addEventListener('mouseout', function(e) {
        highlighter.style.opacity = '0';
    });

    function highlightElement(element) {
        const rect = element.getBoundingClientRect();
        highlighter.style.top = rect.top + 'px';
        highlighter.style.left = rect.left + 'px';
        highlighter.style.width = rect.width + 'px';
        highlighter.style.height = rect.height + 'px';
    }
}

// Run the highlighting functionality on page load
window.onload = highlightPage;