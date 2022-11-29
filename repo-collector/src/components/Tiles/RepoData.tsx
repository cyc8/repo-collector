import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ErrorInfo } from '../ErrorInfo/ErrorInfo';
import { RepoStatistics } from '../RepoStatistics/RepoStatistics';
import Loading from '../Loading/Loading';
import { AxiosError } from 'axios';

interface RepoDataProps {
  error: null | AxiosError<{message: string}>,
  isLoading: boolean,
  forks: number | null,
  watchers: number | null,
  stars: number | null,
  lastCommit: string | null,
  published: string | null 
}

export default function RepoData({error, isLoading, forks, watchers, stars, lastCommit, published}: RepoDataProps){
  return(
    <>
      <Box sx={{my: 1}}>
      {// show loading screen while repo api call
      isLoading && 
      <Box sx={{display: 'flex', alignItems: 'center'}}>
        <Box sx={{mr: 1}}> <Loading size='small' /> </Box>
        <Typography component='span' color='primary'>Requesting info...</Typography>
      </Box>}

      {// additional repo info from github api
        stars && forks && watchers && lastCommit && published &&
        <RepoStatistics 
          stars={stars}
          forks={forks}
          watchers={watchers}
          lastCommit={lastCommit}
          published={published}
        />}

      {// show error message when error
      error && !isLoading && <ErrorInfo error={error}/>}
      </Box>
    </>
  )
}