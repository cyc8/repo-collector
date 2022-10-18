const registerEventListener = () => {
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    chrome.action.setBadgeText({ text: 'grr' });
  });
};

registerEventListener();

export {};
