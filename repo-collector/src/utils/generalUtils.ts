import { GitHoster } from '../types/global';

// regex git hoster
const github = /^https:\/\/github\.com\//;
const gitlab = /^https:\/\/gitlab\.com\//;
const bitbucket = /^https:\/\/bitbucket\.org\//;
const sponsorLink = 'https://github.com/sponsors/yyx990803';

export const removePossibleTrailingSlash = (url: string) => {
  // checks if last character is a slash and removes it if so
  if (url.slice(-1) === '/') return url.slice(0, -1);
  return url;
};

export const getGitHoster = (href: string): GitHoster => {
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

export const includeUrl = (href: string) => {
  // excöide powered by github links
  const gitHosterHomepage = [
    'https://github.com/',
    'https://github.com',
    'https://gitlab.com/',
    'https://gitlab.com',
    'https://bitbucket.org/',
    'https://bitbucket.org',
  ];
  if (gitHosterHomepage.includes(href)) return false;

  // exclude sponsor links
  const githubSponsorRegex = /^https:\/\/github\.com\/sponsors/;
  if (githubSponsorRegex.test(href)) return false;

  // include only links from git hosters
  if (getGitHoster(href) === 'No Git Hoster') {
    return false;
  } else {
    return true;
  }
};
