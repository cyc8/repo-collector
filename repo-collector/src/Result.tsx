import Tiles from  './components/Tiles/Tiles';
import sadOctopus from './assets/sad_octopus_512x512.png';
import Typography from '@mui/material/Typography';

interface ResultsProps {
  githubUrls: string[],
  disabled: boolean,
}



export default function Result ({githubUrls, disabled}: ResultsProps) {
  // show relevant text depending if website is github or no repos found
  let infotext = disabled ? 'Disabled on GitHub' : 'No GitHub links found';

  return(
    <>
      {githubUrls.length !== 0 ?
        <Tiles githubUrls={githubUrls}/>
        :
        <> 
          <Typography sx={{color: 'white', mt: 2}}>{infotext}</Typography>
          <img src={sadOctopus} alt='sad looking octopus' width='100px' />
        </>
      }
    </>
  )
}