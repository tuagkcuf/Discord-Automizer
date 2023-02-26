chrome.runtime.onInstalled.addListener(() => {
    chrome.tabs.create({
        url: "script.html",
    });
});
