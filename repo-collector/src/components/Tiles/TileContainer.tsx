import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Tooltip from "@mui/material/Tooltip";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { extractDocumentName, extractRepoOwner, githubDomain } from '../../utils/githubUtils';
import repoIcon from '../../assets/repoIcon.svg';
import fileIcon from '../../assets/fileIcon.svg';
import userIcon from '../../assets/userIcon.svg';
import issueIcon from '../../assets/issueIcon.svg'
import githubIcon from '../../assets/github-icon-128x128.png';
import bitbucketIcon from '../../assets/bitbucket-icon-128x128.png';
import gitlabIcon from '../../assets/gitlab-icon-128x128.png';
import { GithubUrlType, GitHoster } from '../../types';

interface TileContainerProps {
  children?: React.ReactNode;
  url: string,
  githubUrlType?: GithubUrlType;
  gitHoster: GitHoster;
}

export default function TileContainer ({ children, url, githubUrlType, gitHoster }: TileContainerProps) {

  const manageLongNames = () => {
    // if git hoster is gitlab or bitbucket simply return url without https://
    // if git hoster is github, extract name from url location
    let documentName = url;
    if(gitHoster === 'Bitbucket' || gitHoster === 'GitLab'){
      // remove domain to shorten name
      documentName =  documentName.replace('https://gitlab.com/', '');
      documentName =  documentName.replace('https://bitbucket.org/', '');
    }
    if(gitHoster === 'GitHub') documentName = extractDocumentName(url);

    const documentNameElem = <Typography component='h2' variant='h6' sx={{fontWeight: 600}}>{documentName}</Typography>

    // create condensed version if name is too long
    const isTooLong = documentName.length > 28
    let documentNameTooltip = null;
    if(isTooLong) {
      const condensedDocumentName = documentName.slice(0, 28) + '...';
      documentNameTooltip =  (
        <Tooltip title={documentName} arrow>
          <Typography component='h2' variant='h6' sx={{fontWeight: 600}}>{condensedDocumentName}</Typography>
        </Tooltip>)
    }
    return isTooLong ? documentNameTooltip : documentNameElem ;
  }
  const documentName = manageLongNames();

  // choose corresponding icons, bitbucket and gitlab use fileicon
  let gitHosterIcon = null;
  let itemIcon = null;
  if(gitHoster === 'GitHub') {
    gitHosterIcon = githubIcon
    if (githubUrlType === 'repo'){
      itemIcon = repoIcon;
    } else if (githubUrlType === 'user') {
      itemIcon = userIcon;
    } else if (githubUrlType === 'file') {
      itemIcon = fileIcon;
    } else {
      itemIcon = issueIcon;
    }
  } else if (gitHoster === 'GitLab') {
    gitHosterIcon = gitlabIcon
    itemIcon = fileIcon;
  } else {
    gitHosterIcon = bitbucketIcon
    itemIcon = fileIcon;
  }

  return (
    <Paper
      sx={{
        borderRadius: 2,
        backgroundColor: '#D8D8D8',
        padding: 1,
        my: 1.5,
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
        <img src={gitHosterIcon} height='50px' width='50px' alt={`${gitHoster} logo`}/>
      </Box>

      <Box sx={{width: 350}}>
        <Box sx={{display: 'flex', alignItems: 'center', pb: 1}}>
          <img src={itemIcon} height='24px' width='24px' alt='item icon' />
          <Box sx={{pl: 1}}>
        
            <Link href={url} target='_blank' rel="noreferrer" underline='hover' color="inherit">
              {documentName}
            </Link>

            {/* display user info when it's a github repo, file or issue */}
            { (githubUrlType !== 'user' && gitHoster === 'GitHub') &&
              <Typography component='span'>by <Link href={githubDomain + extractRepoOwner(url)} target='_blank' rel="noreferrer" underline='always' color="inherit">{extractRepoOwner(url)}</Link>
              </Typography>
            }
          </Box>
        </Box>    
        
        {/* to include RepoData child component */}
        {githubUrlType === 'repo' && children }

        <Button href={url} target='_blank' rel="noreferrer" size='small' variant='contained' endIcon={<OpenInNewIcon />}>
          <>View on {gitHoster}</>
        </Button>
      </Box>
    </Paper>
  );
}