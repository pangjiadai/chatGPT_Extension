// Optional background logic
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'debugCode') {
      // Perform the debugging action
    }
  });
  