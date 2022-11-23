import { categorizeLink, extractDocumentName ,extractRepoOwner, createRepoEndpoint, createRepoApiEndpoint} from './githubUtils';

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