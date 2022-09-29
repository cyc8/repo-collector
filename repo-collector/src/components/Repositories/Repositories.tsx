import axios, {AxiosError} from 'axios';
import { useQueries } from "@tanstack/react-query";
import RepositoryTile from '../RepositoryTile/RepositoryTile';
import Loading from '../Loading/Loading';
import { DOMMessageResponse, GithubResponse } from '../../types';
import Typography from '@mui/material/Typography';

interface RepositoriesProps {
  repoUrls: DOMMessageResponse
}

export default function Repositories ({repoUrls}: RepositoriesProps) {

  const githubUrls = [
    'https://github.com/charlax/professional-programming',
    'https://github.com/30-seconds/30-seconds-of-code',
    'https://github.com/practical-tutorials/project-based-learning',
    'https://github.com/donnemartin/system-design-primer',
    'https://github.com/jwasham/coding-interview-university',
    'https://github.com/mtdvio/every-programmer-should-know',
    'https://github.com/kamranahmedse/developer-roadmap',
    'https://github.com/codecrafters-io/build-your-own-x'
  ]
  
  const createApiEndpoint = (url: string) => {
    // remove the "https://github.com" part
    let APIEndpoint = url.slice(18);
    APIEndpoint = 'https://api.github.com/repos' + APIEndpoint;
    return APIEndpoint
  }
  const githubApiUrls = githubUrls.map((githubUrl) => {
    return createApiEndpoint(githubUrl);
  })

  // queryKey: must be unique to query data and serializable
  // queryFn: function the query uses to request data
  // staleTime: tells you how fresh you data is, staleTime: Infinity --> marks that the data never get stale/old
  const reposData = useQueries({
    queries: githubApiUrls.map((repo, index) => {
      return {
        queryKey: ['repositoryData', index],
        queryFn: () => axios.get(repo)
            .then((res) => {
              // add request url to response object
              res.data.repoUrl = repo;
              return res.data
            }),
        staleTime: Infinity
      }
    })
  })
  return (<Loading />)
  
  // TODO Loadingscreen, maybe display tiles already while loading --> appears quicker
  if( reposData.some((repoData) => { return repoData.isLoading }) ){
    return (<Loading />)
  }

  const isLoading = reposData.some((repoData) => { return repoData.isLoading });
  // const repoAPIUrl = error.response.responseURL ? error.response.responseURL : 
  return (
    <>
      {reposData.map((repoData, index) => {
        const data: GithubResponse | null = repoData.data;

        return ( data && !isLoading ?
          <RepositoryTile
            key={index}
            error={null}
            url={data.repoUrl}
            forks={data.forks}
            watchers={data.subscribers_count}
            stars={data.stargazers_count}
            lastCommit={data.pushed_at}
            published={data.created_at}
          />
          :
          <RepositoryTile
            key={index}
            error={repoData.error instanceof AxiosError<{message: string}>? repoData.error : null}
            url='url'
          />
          )
      }) }
    </>
  )
}