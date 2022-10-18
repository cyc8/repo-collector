import axios, {AxiosError} from 'axios';
import Box from '@mui/material/Box';
import { useQueries } from "@tanstack/react-query";
import RepositoryTile from '../RepositoryTile/RepositoryTile';
import Loading from '../Loading/Loading';
import { createApiEndpoint } from '../../utils/githubUtils';
import { ReposMessageResponse, GithubResponse } from '../../types';

interface RepositoriesProps {
  repoUrls: ReposMessageResponse
}

export default function Repositories ({repoUrls}: RepositoriesProps) {

  // const githubUrls = [
  //   'https://github.com/charlax/professional-programming',
  //   'https://github.com/30-seconds/30-seconds-of-code',
  //   'https://github.com/practical-tutorials/project-based-learning',
  //   'https://github.com/donnemartin/system-design-primer',
  //   'https://github.com/jwasham/coding-interview-university',
  //   'https://github.com/mtdvio/every-programmer-should-know',
  //   'https://github.com/kamranahmedse/developer-roadmap',
  //   'https://github.com/codecrafters-io/build-your-own-x'
  // ]
  
  const githubApiUrls = repoUrls.map((githubUrl) => {
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
  console.log(reposData);
  const isLoading = reposData.some((repoData) => { return repoData.isLoading });

  // when 
  if(!isLoading){
    return (
      <>
        {reposData.map((repoData, index) => {
          const data: GithubResponse | null = repoData.data;
          
          return ( data && !isLoading ?
            <RepositoryTile
              key={index}
              error={null}
              isLoading={isLoading}
              url={repoUrls[index]}
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
              isLoading={isLoading}
              url={repoUrls[index]}
            />
            )
        }) }
      </>
    )
  }

  // when repo urls are passed render urls first
  if(repoUrls){
    return(
      <>
        {repoUrls.map((repoUrl, index) => {
          let error = null;
          if(reposData){
            const currentError = reposData[index].error;
            error = currentError instanceof AxiosError<{message: string}> ? currentError : null;
          }

          return (<RepositoryTile
            key={index}
            error={error}
            isLoading={isLoading}
            url={repoUrl}
          />)
        })}
      </>
    )
  }
  
  // return loading animation when no githubUrls are passed yet
  return(
    <Box sx={{display: 'flex', justifyContent: 'center', mt: 4}}>
      <Loading />
    </Box>
  )
}