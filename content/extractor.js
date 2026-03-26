// page text extraction strategies

function extractTextFromPage(page) {
    const textContent = [];

    // Assuming page is a DOM-like structure, for example
    // you might use document or a similar library to traverse the page.

    // Example strategies
    const strategies = [
        extractFromParagraphs,
        extractFromHeadings,
        extractFromDivs,
    ];

    for (const strategy of strategies) {
        textContent.push(strategy(page));
    }

    return textContent.join('\n');
}

function extractFromParagraphs(page) {
    return Array.from(page.querySelectorAll('p')).map(p => p.innerText).join('\n');
}

function extractFromHeadings(page) {
    return Array.from(page.querySelectorAll('h1, h2, h3')).map(h => h.innerText).join('\n');
}

function extractFromDivs(page) {
    return Array.from(page.querySelectorAll('div')).map(div => div.innerText).join('\n');
}

// Exporting the function for use in other modules
module.exports = {
    extractTextFromPage,
};