import { DOMMessage, ReposMessageResponse } from '../types';
import { filterRepoUrls } from '../utils/githubUtils';

// TODO check manifest permissions

const messagesFromReactAppListener = (
  msg: DOMMessage,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response: ReposMessageResponse) => void
) => {
  // TODO: Possible to use URL JavaScript Object to extract domain, especially when using different version control providers
  // const url = new URL(tabs[0].url);
  // const domain = url.hostname;

  const nodeArray = Array.from(document.querySelectorAll('a'));
  // create new array containing only hrefs
  const hrefArray = nodeArray.map((node) => node.href);
  // filter out only repository hrefs
  const repoUrls: ReposMessageResponse = hrefArray.filter((href) => {
    return filterRepoUrls(href);
  });
  console.log('send message');
  console.log(repoUrls.length);
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

// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
// ---------------------------------------------------------------------

// ---------------------------------------------------------------------
// -------------------------------GHOSTRY GET ACTIVE TAB----------------
// ---------------------------------------------------------------------

export function getActiveTab(callback: any, error: any) {
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    (tabs) => {
      if (chrome.runtime.lastError) {
        console.log('getActiveTab', chrome.runtime.lastError.message);
        if (error && typeof error === 'function') {
          error(chrome.runtime.lastError);
        }
      } else if (tabs.length === 0) {
        if (error && typeof error === 'function') {
          error({ message: 'Active tab not found' });
        }
      } else if (callback && typeof callback === 'function') {
        callback(tabs[0]);
      }
    }
  );
}
// ---------------------------------------------------------------------
// -------------------------------GHOSTRY GET ACTIVE TAB----------------
// ---------------------------------------------------------------------

// permissions:------------------------------
// scripting: to run scripts in the particular tab
