import Tiles from  './components/Tiles/Tiles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface ResultsProps {
  githubUrls: string[],
  disabled: boolean,
}

export default function Result ({githubUrls, disabled}: ResultsProps) {
  // show relevant text depending if website is github or no repos found
  let infotext = disabled ? 'Disabled on GitHub' : 'No GitHub links found :(';

  return(
    <>
      {githubUrls.length !== 0 ?
        <Tiles githubUrls={githubUrls}/>
        :
        <Box sx={{
          height: '346px',
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