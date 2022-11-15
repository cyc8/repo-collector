import { categorizeLink } from './githubUtils';

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