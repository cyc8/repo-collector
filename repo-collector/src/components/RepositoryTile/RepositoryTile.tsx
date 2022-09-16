import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { MetricBox } from '../MetricBox/MetricBox';
import { ActiveInfo } from '../ActiveInfo/ActiveInfo';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import repo from '../../assets/repo.svg';
import githubLogo from '../../assets/github-logo-128x128.png';
import bitbucketLogo from '../../assets/bitbucket-logo-128x128.png';
import gitlabLogo from '../../assets/gitlab-logo-128x128.png';



export const RepositoryTile = () => {
  return (
    <Paper
      sx={{
        borderRadius: 2,
        backgroundColor: '#D8D8D8',
        padding: 1,
        display: 'inline-flex',
      }}
    >
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        pr: 1,
        mr: 1,
        borderRight: '2px solid #999'
      }}>
        <img src={githubLogo} height='50px' width='50px' alt='github logo'/>
      </Box>

      <Box sx={{width: 300}}>
        <Box sx={{display: 'flex', alignItems: 'center', pb: 1}}>
          <img src={repo} height='20px' width='20px' alt='repository icon' />
          <Typography component='h2' variant='h6' sx={{pl: 1, fontWeight: 600}}>chrome-extensions-samples</Typography>
        </Box>

        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <MetricBox count={24.2} type='stars'/>
          <MetricBox count={500} type='forks'/>
          <MetricBox count={3.4} type='watch'/>
        </Box>
        <ActiveInfo />
        <Button href='https://github.com/GoogleChrome/chrome-extensions-samples' target='_blank' size='small' variant='contained' endIcon={<OpenInNewIcon />}>
          View Repo         
        </Button>
      </Box>
    </Paper>
  );
};
