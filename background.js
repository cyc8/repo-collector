chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
});

const getCurrentTab = async () => {
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab;
};
