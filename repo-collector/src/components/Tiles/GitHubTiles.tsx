import { createRepoApiEndpoint, categorizeLink } from '../../utils/githubUtils';
import { GitHoster } from '../../types';
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
  const categorizedIssueUrls = categorizedGithubUrls.filter((url) => url.type === 'issue');


  return (
    <>
    {/* github repositories  */}
    {categorizedRepoUrls.length !== 0 && 
      <>
        <Typography component='h2' variant='h5' color='#eaeaea'>Repos</Typography>
        <Divider sx={{my: 0.5, backgroundColor: '#686868', height: '4px', borderRadius: '2px'}}/>
      </>
      }
    {categorizedRepoUrls.map(({url, apiUrl, type}) => {
      return (
        <TileContainer
          key={url}
          githubUrlType={type}
          url={url}
          gitHoster="GitHub"
        >
          <RepoData apiUrl={apiUrl} />
        </TileContainer>
      )
    })}

    {/* github users */}
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

    {/* github files */}
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

    {/* github issues */}
    {categorizedIssueUrls.length !== 0 &&
    <>
      <Typography component='h2' variant='h5' color='#eaeaea'>Issues</Typography>
      <Divider sx={{my: 0.5, backgroundColor: '#686868', height: '4px', borderRadius: '2px'}}/>
    </>}
    {categorizedIssueUrls.map((githubUrl, index) => {
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