import Tiles from  './components/Tiles/Tiles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface ResultsProps {
  gitUrls: string[],
  disabled: boolean,
}

export default function Result ({gitUrls, disabled}: ResultsProps) {
  // show relevant text depending if website is github or no repos found
  let infotext = disabled ? 'Disabled on GitHub, GitLab and Bitbucket' : 'No Git links found :(';

  return(
    <>
      {gitUrls.length !== 0 ?
        <Tiles gitUrls={gitUrls}/>
        :
        <Box sx={{
          height: '322px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          opacity: '80%'
        }}>
          <Typography sx={{color: 'white', mt: 2}} component='p' variant='h6'>{infotext}</Typography>
        </ Box >
      }
    </>
  )
}