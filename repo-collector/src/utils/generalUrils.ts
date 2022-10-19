export const removePossibleTrailingSlash = (url: string) => {
  // checks if last character is a slash and removes it if so
  if (url.slice(-1) === '/') return url.slice(0, -1);
  return url;
};
