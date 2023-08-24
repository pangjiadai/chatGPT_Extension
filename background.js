// Optional background logic
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'processCode') {
      // Call ChatGPT API here
      fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer YOUR_API_KEY_HERE',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: `Debug the following code: ${message.code}`,
          max_tokens: 100
        })
      }).then(response => response.json())
        .then(data => {
          // Process the ChatGPT output and look for errors or corrections
          // Then send them back to the content script
          // sendResponse({errors: /* extracted errors or corrections */});
        }).catch(error => {
          console.error('Error:', error);
        });
    }
  
    // Return true to indicate that you wish to send a response asynchronously
    return true;
  });
  