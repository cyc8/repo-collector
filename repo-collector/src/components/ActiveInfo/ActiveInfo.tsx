import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface ActiveInfoProps {
  lastCommit: number,
  published: number,
}

export const ActiveInfo = ({lastCommit, published}: ActiveInfoProps) => {
  return(
    <Box sx={{mt: 1, mb: 1}}>

      <Typography variant='body1' component='p'>
        <Box component='span' sx={{fontWeight: 500}}>Last Commit: </Box>
        {lastCommit}
      </Typography> 

      <Typography variant='body1' component='p'>
        <Box component='span' sx={{fontWeight: 500}}>First Published: </Box>
        {published}
      </Typography> 

    </Box>
  )
}