document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('debugBtn').addEventListener('click', function() {
    // You can communicate with your content script or background script here
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {action: 'triggerDebug'}, function(response) {
        // Handle any response here
      });
    });
  });
});
