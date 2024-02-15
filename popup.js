// popup.js

document.getElementById('collapse').addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "collapse"}, function(response) {
            console.log(response.result);
        });
    });
});

document.getElementById('expand').addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "expand"}, function(response) {
            console.log(response.result);
        });
    });
});
