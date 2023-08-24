// capture code and manipulate the DOM
document.addEventListener('DOMContentLoaded', function() {
    let codeElement = document.querySelector('.your-selector-here');
  
    if (codeElement) {
      let userCode = codeElement.textContent || codeElement.innerText;
  
      // Send userCode to the background script for API processing
      chrome.runtime.sendMessage({action: 'processCode', code: userCode}, function(response) {
        // Handle response, such as highlighting errors
        if (response && response.errors) {
          // Highlight errors or replace code
        }
      });
    }
  });
  