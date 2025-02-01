// Cache DOM elements
const compElement = document.querySelector(".comp");
const codeElement = document.querySelector(".code");

// Set initial dimensions using viewport size instead of screen
function setInitialSizes() {
    compElement.style.height = `${window.innerHeight * 0.4}px`;
    compElement.style.width = `${window.innerWidth * 0.4}px`;
    codeElement.style.height = `${window.innerHeight * 0.3}px`;
    codeElement.style.width = `${window.innerWidth * 0.85}px`;
}

// Add debounce function to limit rapid calls
function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(this, args), timeout);
    };
}

// Enhanced compile function with error handling
function compile() {
    try {
        const userCode = codeElement.value;
        compElement.srcdoc = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                    /* Basic CSS reset for the iframe */
                    body { margin: 0; padding: 10px; }
                    * { box-sizing: border-box; }
                </style>
            </head>
            <body>
                ${userCode}
            </body>
            </html>
        `;
    } catch (error) {
        console.error('Compilation error:', error);
        compElement.srcdoc = `<p style="color: red">Error: ${error.message}</p>`;
    }
}

// Add responsive behavior
window.addEventListener('resize', debounce(setInitialSizes));
window.addEventListener('DOMContentLoaded', () => {
    setInitialSizes();
    // Add auto-compile when typing with debounce
    codeElement.addEventListener('input', debounce(compile));
    
    // Initialize with empty iframe
    compElement.srcdoc = '<p>Start typing to see preview...</p>';
});

// Add basic error styling
codeElement.style.cssText = `
    font-family: monospace;
    padding: 10px;
    border: 2px solid #ccc;
    border-radius: 4px;
    resize: vertical;
`;
