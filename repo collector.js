(function () {
  const gmailWindow = window;
  if (gmailWindow.location.href.indexOf('https://mail.google.com/') === -1) {
    alert('You have to run the bookmarklet from a Gmail window');
    return;
  }
  gmailWindow.location.assign('https://mail.google.com/mail/u/0/#settings/accounts');
  const xpath = "//span[text()='Check mail now']";

  const refreshAccounts = () => {
    const selectedNodeElements = gmailWindow.document.evaluate(xpath, gmailWindow.document, null, XPathResult.ANY_TYPE, null);
    let currentNode = selectedNodeElements.iterateNext();
    if (currentNode === null) {
      setTimeout(refreshAccounts, 100);
    } else {
      while (currentNode) {
        currentNode.click();
        currentNode = selectedNodeElements.iterateNext();
      }
      gmailWindow.location.assign('https://mail.google.com/mail/u/0/#inbox');
    }
  };
  setTimeout(refreshAccounts, 100);
})();
// ---------------------------------------------------------------------------
// select all href with github.com
const xpath = '//*[contains(@href,"github.com")]';

const hrefNodes = window.document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null);
let currentNode = hrefNodes.iterateNext();
while (currentNode) {
  console.log(currentNode);
  currentNode = hrefNodes.iterateNext();
}

console.log(hrefNodes);
