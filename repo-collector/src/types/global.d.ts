// TODO

export type GithubResponse = {
  data: {
      forks: number,
      subscribers_count: number,
      stargazers_count: number,
      pushed_at: string,
      created_at: string,
      repoUrl: string,
      name: string,
      owner: {
        login: string,
      }
    } | null
  }