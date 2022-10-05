export const githubDomain = 'https://github.com/';
export const githubApiDomain = 'https://api.github.com/';

export const extractRepoName = (url: string) => {
  const indexLastSlash = url.lastIndexOf('/');
  return url.slice(indexLastSlash + 1)
}

export const extractRepoOwner = (url: string) => {
  // remove github domain
  let repoOwner = url.slice(19);
  const indexSlash = repoOwner.indexOf('/');
  return repoOwner.slice(0, indexSlash);
}


// --------------- transform urls --------------- 

export const createRepoEndpoint = (apiUrl: string) => {
  // remove domain
  const urlPath = apiUrl.slice(29);
  return githubDomain + urlPath
}

export const createApiEndpoint = (url: string) => {
  // remove domain
  let APIEndpoint = url.slice(18);
  APIEndpoint = githubApiDomain + 'repos' + APIEndpoint;
  return APIEndpoint
}