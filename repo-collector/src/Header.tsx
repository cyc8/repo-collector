import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import avatar from './assets/repo-collector-avatar.png';
import Button from '@mui/material/Button';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import GitHubLogin from './GitHubLogin';

interface HeaderProps {
  reposCount: number
}

export default function Headers ({reposCount}:HeaderProps) {
  return (
    <>
      <Box sx={{
        width: '480px', 
        boxSizing: 'border-box', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        mb: 1.5,
        borderBottom: '2px solid #333',
      }}
        data-testid='extension-header'
      >
        <img src={avatar} alt='repo collector avatar' height='40px' width='75'/>
        <Typography component='h1' variant='h4' sx={{
          ml: 1.5, 
          fontWeight: 700, 
          fontSize: '1.75rem', 
          textAlign: 'center', 
          color: 'primary.main'
        }}>
          Repo Collector
        </Typography>
        <GitHubLogin />
      </Box>

      { reposCount !== 0 &&
      <Typography component='p' sx={{color: 'rgba(255,255,255,0.5)', textAlign: 'center', mb: 1.5}}>
        Found on page: 
          <Box component='span' sx={{
            color: '#e2e2e2',
            border: '1px solid',
            padding: '2px 4px',
            borderRadius: '5px',
            ml: 1
          }}>
            <b>{reposCount}</b>
          </Box>
      </Typography> }
    </>
  )
}