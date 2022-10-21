import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { extractRepoName, extractRepoOwner, githubDomain } from '../../utils/githubUtils';
import repo from '../../assets/repo.svg';
import fileIcon from '../../assets/fileIcon.svg';
import userIcon from '../../assets/userIcon.svg';
import githubLogo from '../../assets/github-logo-128x128.png';
import { GithubUrlType } from '../../types';

interface TileContainerProps {
  children?: React.ReactNode;
  url: string,
  githubUrlType: GithubUrlType;
}
export default function TileContainer ({ children, url, githubUrlType }: TileContainerProps) {
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
        {githubUrlType === 'repo' && <img src={repo} height='20px' width='20px' alt='repository icon' />}
        {githubUrlType === 'user' && <img src={userIcon} height='20px' width='20px' alt='user icon' />}
        {githubUrlType === 'file' && <img src={fileIcon} height='20px' width='20px' alt='file icon' />}
          <Box sx={{pl: 1}}>
            <Link href={url} target='_blank' rel="noreferrer" underline='hover' color="inherit">
              <Typography component='h2' variant='h6' sx={{fontWeight: 600}}>{extractRepoName(url)}</Typography> {/* TODO restrict length of repo name */}
            </Link>
            <Typography component='span'>by <Link href={githubDomain + extractRepoOwner(url)} target='_blank' rel="noreferrer" underline='always' color="inherit">{extractRepoOwner(url)}</Link>
            </Typography>
          </Box>
        </Box>    
        
        {githubUrlType === 'repo' && children }

        <Button href={url} target='_blank' rel="noreferrer" size='small' variant='contained' endIcon={<OpenInNewIcon />}>
          {githubUrlType === 'repo' && <>View Repo</>}
          {githubUrlType === 'user' && <>View Profile</>}
          {githubUrlType === 'file' && <>View File</>}
        </Button>
      </Box>
    </Paper>
  );
}