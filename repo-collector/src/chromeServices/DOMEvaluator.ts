import { DOMMessage, ReposMessageResponse } from '../types';
import { includeUrl } from '../utils/generalUtils';

const messagesFromReactAppListener = (
  msg: DOMMessage,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response: ReposMessageResponse) => void
) => {
  // disable when on github
  const urlObject = new URL(window.location.href);
  const domain = urlObject.hostname;
  if (domain === 'github.com' || domain === 'gitlab.com' || domain === 'bitbucket.org') {
    sendResponse({
      disabled: true,
      gitUrls: [],
    });
    return;
  }

  const nodeArray = Array.from(document.querySelectorAll('a'));
  // create new array containing only hrefs values
  const hrefArray = nodeArray.map((node) => node.href);
  // filter out only git hrefs
  const gitHosterUrls = hrefArray.filter((href) => {
    return includeUrl(href);
  });

  // filter out only unique links
  const uniqueRepos = gitHosterUrls.filter((v, i, a) => a.indexOf(v) === i);

  sendResponse({
    disabled: false,
    gitUrls: uniqueRepos,
  });
};

/*
Register Message Listener:
Fired when a message is sent from either an extension process or a content script.
*/
chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
