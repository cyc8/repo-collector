import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export const ActiveInfo = () => {
  return(
    <Box sx={{mt: 1, mb: 1}}>

      <Typography variant='body1' component='p'>
        <Box component='span' sx={{fontWeight: 500}}>Last Commit: </Box>
        2 days ago
      </Typography> 

      <Typography variant='body1' component='p'>
        <Box component='span' sx={{fontWeight: 500}}>First Published: </Box>
        06.16.2014
      </Typography> 

    </Box>
  )
}