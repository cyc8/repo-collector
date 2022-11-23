export const removePossibleTrailingSlash = (url: string) => {
  // checks if last character is a slash and removes it if so
  if (url.slice(-1) === '/') return url.slice(0, -1);
  return url;
};

export const filterRepoUrls = (href: string) => {
  // github regex segments:
  // ------------------------------------------
  // githubDomain '^https:\/\/github\.com\/'
  // githubUser '[^\/]{1,38}\/'
  // githubRepoName '[\w\.@\:\/\-~]+$'
  // const githubRepo = /^https:\/\/github\.com\/[^/]{1,38}\/[\w.@:/\-~]+$/;

  // skip powered by github links
  if (href === ('https://github.com/' || 'https://github.com')) return false;
  if (href === ('https://github.com/' || 'https://github.com')) return false;

  // regex modules
  const github = /^https:\/\/github\.com\//;
  const gitlab = /^https:\/\/gitlab\.com\//;
  // const bitbucket = /^https:\/\/bitbucket\.org\//;
  const isRepoHoster = github.test(href) || gitlab.test(href);
  return isRepoHoster;
};
