import { GitHoster } from '../types/global';

// regex git hoster
const github = /^https:\/\/github\.com\//;
const gitlab = /^https:\/\/gitlab\.com\//;
const bitbucket = /^https:\/\/bitbucket\.org\//;

export const removePossibleTrailingSlash = (url: string) => {
  // checks if last character is a slash and removes it if so
  if (url.slice(-1) === '/') return url.slice(0, -1);
  return url;
};

export const getGitHoster = (href: string): GitHoster => {
  // skip powered by github links
  const gitHosterHomepage = [
    'https://github.com/',
    'https://github.com',
    'https://gitlab.com/',
    'https://gitlab.com',
    'https://bitbucket.org/',
    'https://bitbucket.org',
  ];
  if (gitHosterHomepage.includes(href)) return 'No Git Hoster';

  // test all git hoster against regex
  if (github.test(href)) {
    return 'GitHub';
  } else if (gitlab.test(href)) {
    return 'GitLab';
  } else if (bitbucket.test(href)) {
    return 'Bitbucket';
  } else {
    return 'No Git Hoster';
  }
};
