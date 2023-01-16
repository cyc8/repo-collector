import { createContext } from 'react';

const GithubRepoContext = new createContext(undefined);

export const GithubRepoProvider = (children) => {
  const [githubRepo] = 

  return(
    <GithubRepoContext.Provider></GithubRepoContext.Provider>
  )
}