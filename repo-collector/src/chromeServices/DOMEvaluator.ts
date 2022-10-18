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

// permissions:------------------------------
// scripting: to run scripts in the particular tab
