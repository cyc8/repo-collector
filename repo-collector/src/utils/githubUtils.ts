// TODO
// - filter double links
// -

export const githubDomain = 'https://github.com/';
export const githubApiDomain = 'https://api.github.com/';

export const extractRepoName = (url: string) => {
  const indexLastSlash = url.lastIndexOf('/');
  return url.slice(indexLastSlash + 1);
};

export const extractRepoOwner = (url: string) => {
  // remove github domain
  let repoOwner = url.slice(19);
  const indexSlash = repoOwner.indexOf('/');
  return repoOwner.slice(0, indexSlash);
};

export const filterRepoUrls = (href: string) => {
  // github regex segments:
  // ------------------------------------------
  // githubDomain '^https:\/\/github\.com\/'
  // githubUser '[^\/]{1,38}\/'
  // githubRepoName '[\w\.@\:\/\-~]+$'

  // regex modules
  const github = /^https:\/\/github\.com\/[^/]{1,38}\/[\w.@:/\-~]+$/;
  const bitbucket = /^https:\/\/bitbucket\.org\//;
  const gitlab = /^https:\/\/gitlab\.com\//;

  return github.test(href);
};

// --------------- transform urls: API - Repo Endpoint ---------------
export const createRepoEndpoint = (apiUrl: string) => {
  // remove domain
  const urlPath = apiUrl.slice(29);
  return githubDomain + urlPath;
};

export const createApiEndpoint = (url: string) => {
  // remove domain
  let APIEndpoint = url.slice(18);
  APIEndpoint = githubApiDomain + 'repos' + APIEndpoint;
  return APIEndpoint;
};
