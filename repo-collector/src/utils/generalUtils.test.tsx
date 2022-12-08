import { getGitHoster, includeUrl, removeOnpageRef } from './generalUtils';

it('get only repository links', () => {
  const sampleUrls = [
    "https://github.com/facebook/jest/tree/main/examples/enzyme",
    "https://jestjs.io/docs/tutorial-react#custom-transformers",
    "https://jestjs.io/docs/code-transformation#writing-custom-transformers",
    "https://github.com/facebook/jest/edit/main/website/versioned_docs/version-29.3/TutorialReact.md",
    "https://jestjs.io/docs/architecture",
    "https://jestjs.io/docs/tutorial-react-native",
    "https://jestjs.io/docs/tutorial-react#setup",
    "https://jestjs.io/docs/tutorial-react#setup-with-create-react-app",
    "https://jestjs.io/docs/tutorial-react#setup-without-create-react-app",
    "https://jestjs.io/docs/tutorial-react#snapshot-testing",
    "https://jestjs.io/docs/tutorial-react#dom-testing",
    "https://jestjs.io/docs/tutorial-react#custom-transformers",
    "https://jestjs.io/docs/getting-started",
    "https://jestjs.io/docs/snapshot-testing",
    "https://jestjs.io/docs/api",
    "https://stackoverflow.com/questions/tagged/jestjs",
    "https://www.reactiflux.com/",
    "https://twitter.com/fbjest",
    "https://jestjs.io/blog",
    "https://github.com/facebook/jest",
    "https://twitter.com/fbjest",
    "https://opensource.facebook.com/legal/privacy/",
    "https://opensource.facebook.com/legal/terms/",
    "https://opensource.facebook.com/",
    "https://gitlab.com/saurabhshah231/reactjs-myapp/-/tree/master/",
  ]

  const onlyGitHosterLinks = [
    "https://github.com/facebook/jest/tree/main/examples/enzyme",
    "https://github.com/facebook/jest/edit/main/website/versioned_docs/version-29.3/TutorialReact.md",
    "https://github.com/facebook/jest",
    "https://gitlab.com/saurabhshah231/reactjs-myapp/-/tree/master/",
  ]
  const actualFilteredLinks = sampleUrls.filter((link) => {
    return getGitHoster(link) !== "No Git Hoster"
  });
  expect(actualFilteredLinks).toEqual(onlyGitHosterLinks);
})

it('exclude sponsor link', () => {
  const exampleUrls = [
    'https://github.com/sponsors/yyx990803',
    'https://github.com/facebook/jest',
    'https://bitbucket.org/',
    'https://bitbucket.org/',
  ]

  const expectedResult = ['https://github.com/facebook/jest'];

  const acualResult = exampleUrls.filter((url) => includeUrl(url));

  expect(acualResult).toEqual(expectedResult);
})

it('remove onpage reference', () => {
  const exampleUrls = [
    'https://github.com/jsdom/jsdom#customizing-jsdom#asdfasdf',
    'https://github.com/jsdom/jsdom#customizing-jsdom#asdfasdf#38dhj#',
  ]

  const expectedResult =[
    'https://github.com/jsdom/jsdom',
    'https://github.com/jsdom/jsdom',
  ]

  const actualCleanedUrls = exampleUrls.map((url) => removeOnpageRef(url))

  expect(actualCleanedUrls).toEqual(expectedResult);
})