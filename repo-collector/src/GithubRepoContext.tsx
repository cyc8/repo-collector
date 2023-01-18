import { createContext, useContext, useState } from 'react';
import { GithubResponse } from './types';

interface GithubRepoProviderProps {
  children: React.ReactElement;
}

const GithubRepoContext = createContext<GithubResponse | null >(null);

export const GithubRepoProvider = ({children}: GithubRepoProviderProps) => {
  const [githubRepo] = useState({
    forks: 123,
    subscribers_count: 123,
    stargazers_count: 123,
    pushed_at: '2022-04-12',
    created_at: '2022-04-12',
    repoUrl: 'https://test.com',
    name: 'repo-name',
    owner: {
      login: 'max-muster',
    },
  })

  return(
    <GithubRepoContext.Provider value={{ ...githubRepo }}>
      {children}
    </GithubRepoContext.Provider>
  )
}

// created for convenience - only one import
// custom hook wraps useContext hook to consume context value
export const useGithubRepo = () => {
  const githubRepoContext = useContext(GithubRepoContext);


  if (!githubRepoContext) {
    throw new Error(
      "GithubRepoContext has to be used within <CurrentUserContext.Provider>"
    );
  }
}