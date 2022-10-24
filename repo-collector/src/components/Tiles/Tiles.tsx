import axios, {AxiosError} from 'axios';
import { useQueries } from "@tanstack/react-query";
import { createRepoApiEndpoint, categorizeLink } from '../../utils/githubUtils';
import { GithubResponse, GithubUrlType } from '../../types';
import TileContainer from './TileContainer';
import RepoData from './RepoData';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';


interface TilesProps {
  githubUrls: string[]
}

export default function Tiles ({githubUrls}: TilesProps) {
  
  // categorize github links
  const categorizedGithubUrls = githubUrls.map((githubUrl) => {
    // generate repo api endpoints when link type repo
    if (categorizeLink(githubUrl) === 'repo') {
      return {
        url: githubUrl,
        apiUrl: createRepoApiEndpoint(githubUrl),
        type: categorizeLink(githubUrl)
      }
    }
    return {
      url: githubUrl,
      apiUrl: '',
      type: categorizeLink(githubUrl)
    }
  });

  const categorizedRepoUrls = categorizedGithubUrls.filter((url) => url.type === 'repo');
  const categorizedUserUrls = categorizedGithubUrls.filter((url) => url.type === 'user');
  const categorizedFileUrls = categorizedGithubUrls.filter((url) => url.type === 'file');

  // only request api data for repo urls
  const reposData = useQueries({
    queries: categorizedRepoUrls.map((repo, index) => {
      return {
        // queryKey: must be unique to query data and serializable
        queryKey: ['repositoryData', index],
        // queryFn: function the query uses to request data
        queryFn: () => axios.get(repo.apiUrl)
        .then((res) => {
          // add request url to response object
          res.data.repoUrl = repo.url;
          return res.data
        }),
        // staleTime: tells you how fresh you data is, staleTime: Infinity --> marks that the data never get stale/old
        staleTime: Infinity,
        retry: false,
      }
    })
  })

  console.log(reposData);
  const isLoading = reposData.some((repoData) => { return repoData.isLoading });

  return (
    <>
      {/* all repositories  */}
      {categorizedRepoUrls.length !== 0 && 
        <>
          <Typography component='h2' variant='h5' color='#eaeaea'>Repos</Typography>
          <Divider sx={{my: 0.5, backgroundColor: '#686868', height: '4px', borderRadius: '2px'}}/>
        </>
        }
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

      {/* all users */}
      {categorizedUserUrls.length !== 0 && 
      <>
        <Typography component='h2' variant='h5' color='#eaeaea'>Users</Typography>
        <Divider sx={{my: 0.5, backgroundColor: '#686868', height: '4px', borderRadius: '2px'}}/>
      </>}
      {categorizedUserUrls.map((githubUrl, index) => {
        return (<TileContainer
          key={index}
          githubUrlType={githubUrl.type}
          url={githubUrl.url}
        />)
      })}

      {/* all files */}
      {categorizedFileUrls.length !== 0 &&
      <>
        <Typography component='h2' variant='h5' color='#eaeaea'>Files</Typography>
        <Divider sx={{my: 0.5, backgroundColor: '#686868', height: '4px', borderRadius: '2px'}}/>
      </>}
      {categorizedFileUrls.map((githubUrl, index) => {
        return (<TileContainer 
          key={index}
          githubUrlType={githubUrl.type}
          url={githubUrl.url}
        />)
      })}

    </>
  )
}