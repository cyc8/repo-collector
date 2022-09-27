import { DOMMessage, DOMMessageResponse } from "../types";

// Message Listener: Function called when a new message is received
const messagesFromReactAppListener = (msg: DOMMessage, sender: chrome.runtime.MessageSender, sendResponse: (response: DOMMessageResponse) => void) => {
    const testRegex = (href: string) => {
      
      // github regex segments:
      // ------------------------------------------
      // githubDomain '^https:\/\/github\.com\/'
      // githubUser '[^\/]{1,38}\/'
      // githubRepoName '[\w\.@\:\/\-~]+$'

      // regex modules
      const github = /^https:\/\/github\.com\/[^/]{1,38}\/[\w.@:/\-~]+$/;
      const bitbucket = /^https:\/\/bitbucket\.org\//;
      const gitlab = /^https:\/\/gitlab\.com\//;

      return github.test(href)
    };

    const nodeArray = Array.from(document.querySelectorAll('a'));
    // create new array containing only hrefs
    const hrefArray = nodeArray.map(node => node.href);
    // filter out only repository hrefs
    const repos = hrefArray.filter((href) => { return testRegex(href) });
    
    // Prepare the response object with information about the site
    const response: DOMMessageResponse = repos ;
  
    sendResponse(response);
}
 
/**
Register Message Listener:
Fired when a message is sent from either an extension process or a content script.
*/
chrome.runtime.onMessage.addListener(messagesFromReactAppListener);