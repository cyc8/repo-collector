import { GITHUB_OAUTH } from '../env';
import { removeTrailingSlash } from './generalUtils';
import { GithubUrlType } from '../types';

export const githubDomain = 'https://github.com/';
export const githubApiDomain = 'https://api.github.com/';

export const categorizeLink = (url: string): GithubUrlType => {
  let urlPath = removeTrailingSlash(url);
  urlPath = urlPath.replace(githubDomain, '');
  const pathDirs = urlPath.split('/');

  if (pathDirs.length >= 3 && pathDirs[2] === 'issues') {
    return 'issue';
  }

  switch (pathDirs.length) {
    case 1:
      return 'user';
    case 2:
      return 'repo';
    default:
      return 'file';
  }
};

export const extractDocumentName = (url: string) => {
  const type = categorizeLink(url);
  let urlPath = removeTrailingSlash(url);
  urlPath = urlPath.replace(githubDomain, '');
  const pathDirs = urlPath.split('/');

  switch (type) {
    case 'user':
      return pathDirs[0];
    case 'repo':
      return pathDirs[1];
    case 'file':
      return pathDirs[pathDirs.length - 1];
    case 'issue':
      return 'Issue No: ' + pathDirs[3];
  }
};

export const extractRepoOwner = (url: string) => {
  const urlPath = url.replace(githubDomain, '');
  const pathDirs = urlPath.split('/');
  return pathDirs[0];
};

// --------------- transform urls: API - Repo Endpoint ---------------
export const createRepoEndpoint = (apiUrl: string) => {
  const urlPath = apiUrl.replace(`${githubApiDomain}repos/`, '');
  return githubDomain + urlPath;
};

export const createRepoApiEndpoint = (url: string) => {
  let apiEndpoint = removeTrailingSlash(url);
  apiEndpoint = apiEndpoint.replace(githubDomain, '');
  apiEndpoint = `${githubApiDomain}repos/${apiEndpoint}`;
  return apiEndpoint;
};

export const GitHubToken = {
  setOAuth(code: string) {
    // TODO
    //return API.OAuth(code);
  },
  // scope: notifaction to watch a repo and public repo for starring, %20 is space to use multiple scopes
  getOAuthLink() {
    const params = new URLSearchParams({
      client_id: GITHUB_OAUTH.clientId,
      scope: 'notifications%20public_repo',
    });
    console.log(GITHUB_OAUTH.clientId);
    return `https://github.com/login/oauth/authorize?${params}`;
  },

  checkScope() {},
};
