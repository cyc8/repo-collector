import { DOMMessage, ReposMessageResponse } from '../types';
import { includeUrl, removeOnpageRef, removeTrailingSlash } from '../utils/generalUtils';

// disable when on git hoster platforms
const onGitHosterPage = () => {
  const urlObject = new URL(window.location.href);
  const currentDomain = urlObject.hostname;
  const disabledDomains = ['github.com', 'docs.github.com', 'gitlab.com', 'bitbucket.org'];
  return disabledDomains.includes(currentDomain);
};

const messagesFromReactAppListener = (
  msg: DOMMessage,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response: ReposMessageResponse) => void
) => {
  if (onGitHosterPage()) {
    sendResponse({
      disabled: true,
      gitUrls: [],
    });
    return;
  }

  // create new array containing only hrefs
  const nodeArray = Array.from(document.querySelectorAll('a'));
  const hrefArray = nodeArray.map((node) => {
    return node.href;
  });

  // filter out only git hrefs
  let gitHosterUrls = hrefArray.filter((href) => {
    return includeUrl(href);
  });

  // clean url - remove onpage ref or trailing slash
  gitHosterUrls = gitHosterUrls.map((gitHosterUrl) => {
    let cleanedUrl = removeOnpageRef(gitHosterUrl);
    cleanedUrl = removeTrailingSlash(gitHosterUrl);
    return cleanedUrl;
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
