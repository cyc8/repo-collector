import axios, {AxiosError} from 'axios';
import { useQueries } from "@tanstack/react-query";
import { createRepoApiEndpoint, categorizeLink } from '../../utils/githubUtils';
import { ReposMessageResponse, GithubResponse, GithubUrlType } from '../../types';
import TileContainer from './TileContainer';
import RepoData from './RepoData';

interface TilesProps {
  githubUrls: ReposMessageResponse
}

export default function Tiles ({githubUrls}: TilesProps) {
  
  // categorize github links
  const categorizedGithubUrls = githubUrls.map((githubUrl) => {
    // generate repo api endpoints when link type repo
    if (categorizeLink(githubUrl) === 'repo') {
      return {
        url: createRepoApiEndpoint(githubUrl),
        type: categorizeLink(githubUrl)
      }
    }
    return {
      url: githubUrl,
      type: categorizeLink(githubUrl)
    }
  });

  // only request api data for repo urls
  const categorizedRepoUrls = categorizedGithubUrls.filter((url) => url.type === 'repo');
  const reposData = useQueries({
    queries: categorizedRepoUrls.map((repo, index) => {
      return {
        // queryKey: must be unique to query data and serializable
        queryKey: ['repositoryData', index],
        // queryFn: function the query uses to request data
        queryFn: () => axios.get(repo.url)
        .then((res) => {
          // add request url to response object
          res.data.repoUrl = repo;
          return res.data
        }),
        // staleTime: tells you how fresh you data is, staleTime: Infinity --> marks that the data never get stale/old
        staleTime: Infinity
      }
    })
  })

  console.log(reposData);
  const isLoading = reposData.some((repoData) => { return repoData.isLoading });
  // return repos after API fetch
  if(!isLoading){
    return (
      <>
        {reposData.map((repoData, index) => {
          const data: GithubResponse | null = repoData.data;
          const githubUrlType: GithubUrlType = categorizedRepoUrls[index].type;
          return (
            <TileContainer
              key={index}
              githubUrlType={githubUrlType}
              url={categorizedRepoUrls[index].url}
            >
              {githubUrlType === 'repo' && 
              <RepoData 
                error={repoData.error instanceof AxiosError<{message: string}>? repoData.error : null}
                isLoading={isLoading} 
                forks={data ? data.forks : undefined}
                watchers={data ? data.subscribers_count : undefined}
                stars={data ? data.stargazers_count : undefined}
                lastCommit={data ? data.pushed_at : undefined}
                published={data ? data.created_at : undefined}
              />}
            </TileContainer>
          )
        })}
      </>
    )
  }
  // show repo data from url, w/o api call
  return(
    <>
      {categorizedRepoUrls.map((repo, index) => {
         const githubUrlType: GithubUrlType = categorizedRepoUrls[index].type;
        // if(reposData){
        //   const currentError = reposData[index].error;
        //   error = currentError instanceof AxiosError<{message: string}> ? currentError : null;
        // }

        return (<TileContainer
          key={index}
          githubUrlType={githubUrlType}
          url={repo.url}
        />)
      })}
    </>
  )
}