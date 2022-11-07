import { DOMMessage, ReposMessageResponse } from '../types';
import { filterRepoUrls } from '../utils/githubUtils';

const messagesFromReactAppListener = (
  msg: DOMMessage,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response: ReposMessageResponse) => void
) => {
  // disable when on github
  const urlObject = new URL(window.location.href);
  const domain = urlObject.hostname;
  if (domain === 'github.com') {
    sendResponse({
      disabled: true,
      repoUrls: [],
    });
    return;
  }

  const nodeArray = Array.from(document.querySelectorAll('a'));
  // create new array containing only hrefs
  const hrefArray = nodeArray.map((node) => node.href);
  // filter out only repository hrefs
  const githubLinks = hrefArray.filter((href) => {
    return filterRepoUrls(href);
  });

  // filter out only unique links
  const uniqueRepos = githubLinks.filter((v, i, a) => a.indexOf(v) === i);

  sendResponse({
    disabled: false,
    repoUrls: uniqueRepos,
  });
};

/*
Register Message Listener:
Fired when a message is sent from either an extension process or a content script.
*/
chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
