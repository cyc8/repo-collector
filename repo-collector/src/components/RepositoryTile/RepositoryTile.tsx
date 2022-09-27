import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { ErrorInfo } from '../ErrorInfo/ErrorInfo';
import { RepoStatistics } from '../RepoStatistics/RepoStatistics';
import { AxiosError } from 'axios';

import repo from '../../assets/repo.svg';
import githubLogo from '../../assets/github-logo-128x128.png';
import bitbucketLogo from '../../assets/bitbucket-logo-128x128.png';
import gitlabLogo from '../../assets/gitlab-logo-128x128.png';

interface RepositoryTileProps {
  // error: { 
  //   message: string,
  //   response: {responseUrl: string}
  // } | null,
  error: null | AxiosError,
  url: string,
  forks?: number,
  watchers?: number,
  stars?: number,
  lastCommit?: string,
  published?: string
}

export default function RepositoryTile ({error, forks, watchers, stars, lastCommit, published, url}: RepositoryTileProps ) {
  const githubDomain = 'https://github.com/';
  
  // if 
  const repoUrl = error ? error.request.responseURL : url;
  console.log(error?.request?.responseURL);
  const extractRepoName = (url: string) => {
    const indexLastSlash = url.lastIndexOf('/');
    return url.slice(indexLastSlash + 1)
  }

  const extractRepoOwner = (url: string) => {
    // remove github domain
    let repoOwner = url.slice(29);
    const indexSlash = repoOwner.indexOf('/');
    return repoOwner.slice(0, indexSlash);
  }

  const transformAPIUrlToNormal = (repoUrl: string) => {
    // remove domain
    const urlPath = repoUrl.slice(29);
    return 'https://github.com/' + urlPath
  }

  return (
    <Paper
      sx={{
        borderRadius: 2,
        backgroundColor: '#D8D8D8',
        padding: 1,
        margin: 1.5,
        display: 'flex',
      }}
    >
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        pr: 1,
        mr: 1,
        borderRight: '1px solid #b1b1b1'
      }}>
        <img src={githubLogo} height='50px' width='50px' alt='github logo'/>
      </Box>

       <Box sx={{width: 300}}>
        <Box sx={{display: 'flex', alignItems: 'center', pb: 1}}>
          <img src={repo} height='20px' width='20px' alt='repository icon' />
          <Box sx={{pl: 1}}>
            <Link href={transformAPIUrlToNormal(repoUrl)} target='_blank' rel="noreferrer" underline='hover' color="inherit">
              <Typography component='h2' variant='h6' sx={{fontWeight: 600}}>{extractRepoName(repoUrl)}</Typography>
            </Link>
            <Typography component='span'>by <Link href={githubDomain + extractRepoOwner(repoUrl)} target='_blank' rel="noreferrer" underline='always' color="inherit">{extractRepoOwner(repoUrl)}</Link>
            </Typography>
          </Box>
        </Box>

        {// additional repo info from github api
        stars && forks && watchers && lastCommit && published ?
          <RepoStatistics 
            stars={stars}
            forks={forks}
            watchers={watchers}
            lastCommit={lastCommit}
            published={published}
          />
        :
          <ErrorInfo error={error}/>
        }

        <Button href={transformAPIUrlToNormal(repoUrl)} target='_blank' rel="noreferrer" size='small' variant='contained' endIcon={<OpenInNewIcon />}>
          View Repo         
        </Button>
      </Box>
    </Paper>
  );
};
