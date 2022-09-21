import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface ActiveInfoProps {
  lastCommit: string,
  published: string,
}

export const ActiveInfo = ({lastCommit, published}: ActiveInfoProps) => {
  let publishedFormatted = published.slice(0,10);
  let lastCommitFormatted = lastCommit.slice(0,10);

  const checkToday = (date: string) => {
    const today = new Date().toISOString().slice(0,10);
    if(date === today){
      return 'today';
    } else {
      return date;
    }
  }

  lastCommitFormatted = checkToday(lastCommitFormatted);
  publishedFormatted = checkToday(publishedFormatted);

  return(
    <Box sx={{mt: 1, mb: 1}}>

      <Typography variant='body1' component='p'>
        <Box component='span' sx={{fontWeight: 500}}>Last Commit: </Box>
        {lastCommitFormatted}
      </Typography> 

      <Typography variant='body1' component='p'>
        <Box component='span' sx={{fontWeight: 500}}>First Published: </Box>
        {publishedFormatted}
      </Typography> 

    </Box>
  )
}