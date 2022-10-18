import { DOMMessage, ReposMessageResponse } from '../types';

const handlePageChange = async (tabId: number, tab: chrome.tabs.Tab, changeInfo?: chrome.tabs.TabChangeInfo) => {
  // skip when on browser specific pages
  if (tab.url && (tab.url.includes('chrome://') || tab.url.includes('chrome-extension://'))) return;

  chrome.tabs.sendMessage(
    // Current tab ID
    tabId || 0,
    // Message type
    { type: 'GET_DOM' } as DOMMessage,
    // Callback executed when the content script sends a response
    (repoUrls: ReposMessageResponse) => {
      updateBadge(tabId, repoUrls.length);
    }
  );
};

// event listener that fires when ne page has finished loading
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') handlePageChange(tabId, tab, changeInfo);
});

// set badge to number of repos found on page
const updateBadge = (tabId: number, repoCount: number) => {
  // return when tabId is not set which is equal 0
  if (tabId === 0) return;

  // only add badge when in production otherwise it will fail in dev
  if (process.env.NODE_ENV === 'production') {
    //display badge when repos were found, otherwise empty string means no badge
    let badgeCount = repoCount === 0 ? '' : repoCount.toString();
    chrome.action.setBadgeText({ text: badgeCount, tabId: tabId });
    chrome.action.setBadgeBackgroundColor({ color: '#ff3737' });
  }
};

export {};
