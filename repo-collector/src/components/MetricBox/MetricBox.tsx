import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";

import StarIcon from '@mui/icons-material/Star';
import VisibilityIcon from '@mui/icons-material/Visibility';
import fork from '../../assets/repo-forked-24.svg';

interface MetricBoxProps {
  count: number,
  type: 'stars' | 'forks' | 'watchers',
}

export const MetricBox = ({count, type}: MetricBoxProps) => {
  // to bring code from e.g. 102387 to 10.2k format  
  const formatCount =  (count: number) => {
    let result
    if(count > 1000){
      result = Math.floor(count / 1000) + '.';
      const remainder = Math.round((count % 1000)/100);
      return result + remainder + 'k';
    } else {
      return count;
    }
  }
  
  const formattedCount = formatCount(count);


  return(
    <Box sx={{
      backgroundColor: 'rgba(255, 255, 255, 0.4)',
      borderRadius: 2,
      width: 90,   
      display: 'flex',
      justifyContent: 'center'   
    }}>
      <Tooltip title={type} arrow>
        <Box sx={{margin: '2px', display: 'flex', opacity: 0.8, alignItems: 'center'}}>
          {type === 'stars' && <StarIcon fontSize='small'/>}
          {type === 'forks' && <img src={fork} alt='repository fork icon' height='16px' width='16px' />}
          {type === 'watchers' && <VisibilityIcon fontSize='small'/>}
          <Typography component='p' sx={{pl: 1, fontWeight: 500, fontSize: '0.9rem'}}> {formattedCount} </Typography>
        </Box>
      </Tooltip>
    </Box>
  )
}