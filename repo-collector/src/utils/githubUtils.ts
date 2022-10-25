import { removePossibleTrailingSlash } from './generalUtils';
import { GithubUrlType } from '../types';

export const githubDomain = 'https://github.com/';
export const githubApiDomain = 'https://api.github.com/';

export const categorizeLink = (url: string): GithubUrlType => {
  let urlPath = removePossibleTrailingSlash(url);
  urlPath = urlPath.replace(githubDomain, '');
  const pathDirs = urlPath.split('/');

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
  let urlPath = removePossibleTrailingSlash(url);
  urlPath = urlPath.replace(githubDomain, '');
  const pathDirs = urlPath.split('/');

  switch (type) {
    case 'user':
      return pathDirs[0];
    case 'repo':
      return pathDirs[1];
    case 'file':
      return pathDirs[pathDirs.length - 1];
  }
};

export const extractRepoName = (url: string) => {
  const urlPath = url.replace(githubDomain, '');
  const pathDirs = urlPath.split('/');
  return pathDirs[1];
};

export const extractRepoOwner = (url: string) => {
  const urlPath = url.replace(githubDomain, '');
  const pathDirs = urlPath.split('/');
  return pathDirs[0];
};

export const filterRepoUrls = (href: string) => {
  // github regex segments:
  // ------------------------------------------
  // githubDomain '^https:\/\/github\.com\/'
  // githubUser '[^\/]{1,38}\/'
  // githubRepoName '[\w\.@\:\/\-~]+$'

  // regex modules
  const github = /^https:\/\/github\.com\//;
  // const githubRepo = /^https:\/\/github\.com\/[^/]{1,38}\/[\w.@:/\-~]+$/;

  // const bitbucket = /^https:\/\/bitbucket\.org\//;
  // const gitlab = /^https:\/\/gitlab\.com\//;

  return github.test(href);
};

// --------------- transform urls: API - Repo Endpoint ---------------
export const createRepoEndpoint = (apiUrl: string) => {
  const urlPath = apiUrl.replace(`${githubApiDomain}repos/`, '');
  return githubDomain + urlPath;
};

export const createRepoApiEndpoint = (url: string) => {
  let apiEndpoint = removePossibleTrailingSlash(url);
  apiEndpoint = apiEndpoint.replace(githubDomain, '');
  apiEndpoint = `${githubApiDomain}repos/${apiEndpoint}`;
  return apiEndpoint;
};
