import { DOMMessage, ReposMessageResponse } from '../types';
import { includeUrl, removeOnpageRef } from '../utils/generalUtils';

const messagesFromReactAppListener = (
  msg: DOMMessage,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response: ReposMessageResponse) => void
) => {
  // disable when on github
  const urlObject = new URL(window.location.href);
  const currentDomain = urlObject.hostname;
  const disabledDomains = ['github.com', 'docs.github.com', 'gitlab.com', 'bitbucket.org'];
  if (disabledDomains.includes(currentDomain)) {
    sendResponse({
      disabled: true,
      gitUrls: [],
    });
    return;
  }

  const nodeArray = Array.from(document.querySelectorAll('a'));
  // create new array containing only hrefs values
  const hrefArray = nodeArray.map((node) => {
    return removeOnpageRef(node.href);
  });
  // filter out only git hrefs
  let gitHosterUrls = hrefArray.filter((href) => {
    return includeUrl(href);
  });

  // remove onpage links (part after hashtag)
  gitHosterUrls = gitHosterUrls.map((gitHosterUrl) => {
    const hashIndex = gitHosterUrl.indexOf('#');
    if (hashIndex !== -1) return gitHosterUrl.slice(0, hashIndex);
    return gitHosterUrl;
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
