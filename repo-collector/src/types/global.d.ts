// TODO

export type GithubResponse = {
  forks: number;
  subscribers_count: number;
  stargazers_count: number;
  pushed_at: string;
  created_at: string;
  repoUrl: string;
  name: string;
  owner: {
    login: string;
  };
} | null;

export type GithubUrlType = 'repo' | 'user' | 'file';
