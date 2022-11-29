import axios, {AxiosError} from 'axios';
import { useQueries } from "@tanstack/react-query";
import { createRepoApiEndpoint, categorizeLink } from '../../utils/githubUtils';
import { GithubResponse, GithubUrlType, GitHoster } from '../../types';
import TileContainer from './TileContainer';
import RepoData from './RepoData';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

interface GitHubTilesProps{
  githubObjects: {
    gitUrl: string,
    gitHoster: GitHoster
  } []
}

export default function GitHubTiles({githubObjects}: GitHubTilesProps) {
  // categorize github links
  const categorizedGithubUrls = githubObjects.map(({gitUrl}) => {
    // generate repo api endpoints when link type repo
    if (categorizeLink(gitUrl) === 'repo') {
      return {
        url: gitUrl,
        apiUrl: createRepoApiEndpoint(gitUrl),
        type: categorizeLink(gitUrl)
      }
    }
    return {
      url: gitUrl,
      apiUrl: '',
      type: categorizeLink(gitUrl)
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

  const isLoading = reposData.some((repoData) => { return repoData.isLoading });

  return (
    <>
    {/* all github repositories  */}
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
          gitHoster="GitHub"
        >
          {githubUrlType === 'repo' && 
          <RepoData 
            error={repoData.error instanceof AxiosError<{message: string}>? repoData.error : null}
            isLoading={isLoading} 
            forks={data ? data.forks : null}
            watchers={data ? data.subscribers_count : null}
            stars={data ? data.stargazers_count : null}
            lastCommit={data ? data.pushed_at : null}
            published={data ? data.created_at : null}
          />}
        </TileContainer>
      )
    })}

    {/* all github users */}
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
        gitHoster="GitHub"
      />)
    })}

    {/* all github files */}
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
        gitHoster="GitHub"
      />)
    })}
    </>
  )
}