// select all href with github.com
const xpath = '//*[contains(@href,"github.com")]';

const hrefNodes = window.document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null);
let currentNode = hrefNodes.iterateNext();

// iterate over all found href nodes
while (currentNode) {
  console.log(currentNode);
  currentNode = hrefNodes.iterateNext();
}
