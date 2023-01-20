import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ErrorInfo } from '../ErrorInfo/ErrorInfo';
import { RepoStatistics } from '../RepoStatistics/RepoStatistics';
import Loading from '../Loading/Loading';
import axios, {AxiosError} from 'axios';
import { useQuery } from "@tanstack/react-query";

interface RepoDataProps {
  apiUrl: string
}

const useGithubData = (apiUrl: string) => {
  // request api data for repo urls
  return useQuery({
    queryKey: [apiUrl],
    queryFn: async() => {
      const { data } = await axios.get(apiUrl);
      return data;
    },
    // staleTime: tells you how fresh you data is, staleTime: Infinity --> marks that the data never get stale/old
    staleTime: Infinity,
    retry: false,
  })
}

export default function RepoData({apiUrl}: RepoDataProps){
  // request api data for repo urls
  const { isLoading, data, error} =  useGithubData(apiUrl);
  
  return(
    <>
      <Box sx={{my: 1}}>
      {// show loading screen while repo api call
      isLoading && 
      <Box sx={{display: 'flex', alignItems: 'center'}}>
        <Box sx={{mr: 1}}> <Loading size='small' /> </Box>
        <Typography component='span' color='primary'>Requesting info...</Typography>
      </Box>}

      { data &&
        <RepoStatistics 
          stars={data.stargazers_count}
          forks={data.forks}
          watchers={data.subscribers_count}
          lastCommit={data.pushed_at}
          published={data.created_at}
        />}

      {// show error message when error
      error instanceof AxiosError<{message: string}>? <ErrorInfo error={error} />: null}
      </Box>
    </>
  )
}