export const extractRepoName = (url: string) => {
  const indexLastSlash = url.lastIndexOf('/');
  return url.slice(indexLastSlash + 1)
}

export const extractRepoOwner = (url: string) => {
  // remove github domain
  let repoOwner = url.slice(29);
  const indexSlash = repoOwner.indexOf('/');
  return repoOwner.slice(0, indexSlash);
}

export const transformAPIUrlToNormal = (repoUrl: string) => {
  // remove domain
  const urlPath = repoUrl.slice(29);
  return 'https://github.com/' + urlPath
}

export const createApiEndpoint = (url: string) => {
  // remove the "https://github.com" part
  let APIEndpoint = url.slice(18);
  APIEndpoint = 'https://api.github.com/repos' + APIEndpoint;
  return APIEndpoint
}