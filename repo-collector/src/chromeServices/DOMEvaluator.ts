import { tab } from '@testing-library/user-event/dist/tab';
import { DOMMessage, ReposMessageResponse } from '../types';
import { filterRepoUrls } from '../utils/githubUtils';

// TODO check manifest permissions

const messagesFromReactAppListener = (
  msg: DOMMessage,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response: ReposMessageResponse) => void
) => {
  const nodeArray = Array.from(document.querySelectorAll('a'));
  // create new array containing only hrefs
  const hrefArray = nodeArray.map((node) => node.href);
  // filter out only repository hrefs
  const repoUrls: ReposMessageResponse = hrefArray.filter((href) => {
    return filterRepoUrls(href);
  });

  sendResponse(repoUrls);
};

/**
Register Message Listener:
Fired when a message is sent from either an extension process or a content script.
*/
chrome.runtime.onMessage.addListener(messagesFromReactAppListener);

// --------------------------------------------
// --------------------------------------------
// --------------------------------------------
// --------------------------------------------
// --------------------------------------------

// chrome.tabs.onActivated.addListener(() => {
//   console.log('active tab changed');
// });

// call handler if url changes
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) handleActivatedUpdated(tab);
});

//call handler if new tab was activated
chrome.tabs.onActivated.addListener(({ tabId }) => {
  chrome.tabs.get(tabId, handleActivatedUpdated);
});

let processingTabId: { [key: string]: boolean } = {};

function handleActivatedUpdated(tab: chrome.tabs.Tab) {
  // prevent accessing chrome specific urls
  if (tab.url && tab.url.includes('chrome://')) {
    return;
  }

  console.log(tab.status);

  if (tab.id && tab.url) {
    // return when already processing the Tab
    if (tab.id in processingTabId) {
      return;
    }

    chrome.storage.local.set({ [tab.id]: true });
    processingTabId[tab.id] = true;

    updateBadge((tabId: number) => {
      // delete tab id property at the end when all done
      console.log('deleteProcessingTabId ' + tabId);
      delete processingTabId[tabId];
    }, tab.id);
  }
}

// tabId: number, changeInfo: chrome.tabs.TabChangeInfo, tab: chrome.tabs.Tab
async function updateBadge(deleteProcessingTabId: Function, tabId: number) {
  console.log('UPDATE BADGE');

  chrome.scripting.executeScript({
    target: { tabId: tabId },
    func: () => {
      console.log('executed scripting function');
      console.log(Array.from(document.querySelectorAll('a')));
      chrome.action.setBadgeText({ text: 'red' });
    },
  });

  // const nodeArray = Array.from(document.querySelectorAll('a'));
  // // create new array containing only hrefs
  // const hrefArray = nodeArray.map((node) => node.href);
  // // filter out only repository hrefs
  // const repoUrls = hrefArray.filter((href) => {
  //   return filterRepoUrls(href);
  // });
  // console.log('UPDATE BADGE - badge number: ' + repoUrls.length);

  // chrome.action.setBadgeText({ text: repoUrls.length.toString() });
  // chrome.action.setBadgeBackgroundColor({ color: '#ff3737' });

  deleteProcessingTabId(tabId);
}
// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
// chrome.tabs.onUpdated.addListener(() => {
//   chrome.tabs.query({ active: true, currentWindow: true, status: 'complete' }, ([tab]) => {
//     console.log(tab);
//     updateBadge();
//   });
// });
// ---------------------------------------------------------------------
// chrome.tabs.onActivated.addListener((activeInfo: chrome.tabs.TabActiveInfo) => {
//   const { tabId } = activeInfo;
//   console.log('Tab Active Switched, TAB ID: ');
//   chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
//     console.log('active tab is...');
//     console.log(tabId);
//   });
// });

// tab status "complete"

// chrome.tabs.onActivated.addListener( ({tabId: number}) => {
//   chrome.tabs.onUpdated.addListener((tabId: number, updatedTabId: number, changeInfo: chrome.tabs.TabChangeInfo, tab: chrome.tabs.Tab) => {
//     if (updatedTabId === tabId )
//     updateBadge(updatedTabId, changeInfo, tab)
//   })
// })

// permissions:------------------------------
// scripting: to run scripts in the particular tab

/*
WHEN DOM IS LOADED, https://developer.chrome.com/docs/extensions/mv3/content_scripts/#run_time
----------------------
chrome.scripting.registerContentScript({
  matches: ['https://*.nytimes.com/*'],
  run_at: 'document_idle',
  js: ['contentScript.js']
});
*/
