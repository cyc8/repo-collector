import { DOMMessage, ReposMessageResponse } from '../types';

const handlePageChange = async (tabId: number, tab: chrome.tabs.Tab, changeInfo?: chrome.tabs.TabChangeInfo) => {
  // skip when on browser specific pages
  if (tab.url && (tab.url.includes('chrome://') || tab.url.includes('chrome-extension://') || tab.url.includes('urlchrome://newtab/'))) {
    return;
  }

  chrome.tabs.sendMessage(
    // Current tab ID
    tabId || 0,
    // Message type
    { type: 'GET_DOM' } as DOMMessage,
    // Callback executed when the content script sends a response
    (response: ReposMessageResponse) => {
      updateBadge(tabId, response.repoUrls.length, response.disabled);
    }
  );
};

// event listener that fires when ne page has finished loading
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') handlePageChange(tabId, tab, changeInfo);
});

// set badge to number of repos found on page
const updateBadge = (tabId: number, repoCount: number, disabled: boolean) => {
  // return when tabId is not set which is equal 0
  if (tabId === 0) return;

  // only add badge when in production otherwise it will fail in dev
  if (process.env.NODE_ENV === 'production') {
    if (disabled) {
      chrome.action.setBadgeText({ text: 'off', tabId: tabId });
      chrome.action.setBadgeBackgroundColor({ color: '#555555' });
    } else {
      //display badge when repos were found, otherwise empty string means no badge
      let badgeCount = repoCount === 0 ? '' : repoCount.toString();
      chrome.action.setBadgeText({ text: badgeCount, tabId: tabId });
      chrome.action.setBadgeBackgroundColor({ color: '#ff3737' });
    }
  }
};

export {};
