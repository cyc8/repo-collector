import { DOMMessage, DOMMessageResponse } from "../types";
import { filterRepoUrls } from '../utils/githubUtils';

// TODO check manifest permissions

// Message Listener: Function called when a new message is received
const messagesFromReactAppListener = (msg: DOMMessage, sender: chrome.runtime.MessageSender, sendResponse: (response: DOMMessageResponse) => void) => {
    const nodeArray = Array.from(document.querySelectorAll('a'));
    // create new array containing only hrefs
    const hrefArray = nodeArray.map(node => node.href);
    // filter out only repository hrefs
    const repos = hrefArray.filter((href) => { return filterRepoUrls(href) });
    
    // Prepare the response object with information about the site
    const response: DOMMessageResponse = repos ;
  
    sendResponse(response);
}
 
/**
Register Message Listener:
Fired when a message is sent from either an extension process or a content script.
*/
chrome.runtime.onMessage.addListener(messagesFromReactAppListener);