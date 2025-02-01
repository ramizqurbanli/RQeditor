// Cache DOM elements
const compElement = document.querySelector(".comp");
// Use getElementById for the code element if using a contenteditable element
const codeElement = document.getElementById("codeField");

// Set initial dimensions using viewport size
function setInitialSizes() {
  // Set dimensions for the iframe preview
  compElement.style.height = `${window.innerHeight * 0.4}px`;
  compElement.style.width = `${window.innerWidth * 0.4}px`;

  // If your editable area is wrapped in a container (like .code-container),
  // you might want to adjust that container's dimensions.
  // Here, we'll assume the parent element of codeElement is the container.
  if (codeElement.parentElement) {
    codeElement.parentElement.style.height = `${window.innerHeight * 0.3}px`;
    codeElement.parentElement.style.width = `${window.innerWidth * 0.85}px`;
  }
}

// Debounce function to limit rapid calls
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
    // For contenteditable elements, use innerText (or textContent) instead of value
    const userCode = codeElement.innerText;
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
    // Save the code to localStorage
    localStorage.setItem('savedCode', userCode);
  } catch (error) {
    console.error('Compilation error:', error);
    compElement.srcdoc = `<p style="color: red">Error: ${error.message}</p>`;
  }
}

// Load saved code from localStorage
function loadSavedCode() {
  const savedCode = localStorage.getItem('savedCode');
  if (savedCode) {
    codeElement.innerText = savedCode;
    compile(); // Render the saved code immediately
  } else {
    compElement.srcdoc = '<p>Start typing to see preview...</p>';
  }
}

// Add responsive behavior
window.addEventListener('resize', debounce(setInitialSizes));
window.addEventListener('DOMContentLoaded', () => {
  setInitialSizes();
  loadSavedCode();
  // Add auto-compile on input with debounce
  codeElement.addEventListener('input', debounce(compile));
});

// Add basic styling to the code element
codeElement.style.cssText = `
  font-family: monospace;
  padding: 10px;
  border: 2px solid #ccc;
  border-radius: 4px;
  outline: none;
`;
