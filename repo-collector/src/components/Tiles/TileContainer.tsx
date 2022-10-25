import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Tooltip from "@mui/material/Tooltip";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { extractDocumentName, extractRepoOwner, githubDomain } from '../../utils/githubUtils';
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

  const handleLongNames = () => {
    let documentName = extractDocumentName(url);
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

  const documentName = handleLongNames();

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
        <img src={githubLogo} height='50px' width='50px' alt='github logo'/>
      </Box>

      <Box sx={{width: 350}}>
        <Box sx={{display: 'flex', alignItems: 'center', pb: 1}}>
        {githubUrlType === 'repo' && <img src={repo} height='20px' width='20px' alt='repository icon' />}
        {githubUrlType === 'user' && <img src={userIcon} height='24px' width='24px' alt='user icon' />}
        {githubUrlType === 'file' && <img src={fileIcon} height='24px' width='24px' alt='file icon' />}
          <Box sx={{pl: 1}}>
              
            <Link href={url} target='_blank' rel="noreferrer" underline='hover' color="inherit">
              {documentName}
            </Link>
            { githubUrlType !== 'user' &&
              <Typography component='span'>by <Link href={githubDomain + extractRepoOwner(url)} target='_blank' rel="noreferrer" underline='always' color="inherit">{extractRepoOwner(url)}</Link>
              </Typography>
            }
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