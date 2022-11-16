import { categorizeLink, extractDocumentName ,extractRepoOwner, filterRepoUrls, createRepoEndpoint, createRepoApiEndpoint} from './githubUtils';

test('categorize github file link', () => {
  // arrange
  const fileLink = 'https://github.com/facebook/jest/edit/main/website/versioned_docs/version-29.3/TutorialReact.md';
  const expectedCategory = 'file'
  // act
  const actualCategory = categorizeLink(fileLink);

  //assert
  expect(actualCategory).toBe(expectedCategory);
})

test('categorize github repo link', () => {
  // arrange
  const fileLink = 'https://github.com/charlax/professional-programming';
  const expectedCategory = 'repo'
  // act
  const actualCategory = categorizeLink(fileLink);

  //assert
  expect(actualCategory).toBe(expectedCategory);
})

test('categorize github user link', () => {
  // arrange
  const fileLink = 'https://github.com/charlax';
  const expectedCategory = 'user'
  // act
  const actualCategory = categorizeLink(fileLink);

  //assert
  expect(actualCategory).toBe(expectedCategory);
})


test('get the name of document from url', ()=>{
  const expectedName = 'professional-programming';
  const actualName = extractDocumentName('https://github.com/charlax/professional-programming');
  expect(actualName).toBe(expectedName);
})

test('get owner of repo from url', () => {
  const expectedName = 'charlax';
  const actualName = extractRepoOwner('https://github.com/charlax/professional-programming');
  expect(actualName).toBe(expectedName);
})

test('get only repository links', () => {
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
    "https://opensource.facebook.com/"
  ]

  const onlyGitHublinks = [
    "https://github.com/facebook/jest/tree/main/examples/enzyme",
    "https://github.com/facebook/jest/edit/main/website/versioned_docs/version-29.3/TutorialReact.md",
    "https://github.com/facebook/jest",
  ]
  const actualFilteredLinks = sampleUrls.filter((link) => {
    return filterRepoUrls(link)
  });
  expect(actualFilteredLinks).toEqual(onlyGitHublinks);
})

test('create repo endpoint from api', () => {
  const apiEndpoint = 'https://api.github.com/repos/charlax/professional-programming';
  const expectedEndpoint = 'https://github.com/charlax/professional-programming';
  const acualEndpoint = createRepoEndpoint(apiEndpoint);
  expect(acualEndpoint).toBe(expectedEndpoint);
})

test('create api endpoint from repo url', () => {
  const repoEndpoint = 'https://github.com/charlax/professional-programming';
  const expectedEndpoint = 'https://api.github.com/repos/charlax/professional-programming';
  const acualEndpoint = createRepoApiEndpoint(repoEndpoint);
  expect(acualEndpoint).toBe(expectedEndpoint);
})