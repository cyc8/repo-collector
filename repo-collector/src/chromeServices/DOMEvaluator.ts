import { DOMMessage, DOMMessageResponse } from "../types";

// Message Listener: Function called when a new message is received
const messagesFromReactAppListener = (msg: DOMMessage, sender: chrome.runtime.MessageSender, sendResponse: (response: DOMMessageResponse) => void) => {
    console.log('[content.js]. Message received', msg);

    // regex modules
    const githubDomain = '^https:\/\/github\.com\/';
    const githubUser = '[^\/]{1,38}\/';
    const githubRepoName = '[\w\.@\:\/\-~]+$'

    const testRegex = (href: string) => {
      const gitHubregex = new RegExp( githubDomain + githubUser + githubRepoName);
      return gitHubregex.test(href)
    };

    const nodeArray = Array.from(document.querySelectorAll('a'));
    // create new array containing only hrefs
    const hrefArray = nodeArray.map(node => node.href);
    // filter out only repository hrefs
    const repos = hrefArray.filter((href) => { return testRegex(href) });
    repos.forEach(repo => {console.log(repo)})
    
    // Prepare the response object with information about the site
    const response: DOMMessageResponse = repos ;
  
    sendResponse(response);
}
 
/**
Register Message Listener:
Fired when a message is sent from either an extension process or a content script.
*/
chrome.runtime.onMessage.addListener(messagesFromReactAppListener);