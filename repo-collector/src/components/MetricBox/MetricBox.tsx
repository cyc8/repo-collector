import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";

import StarIcon from '@mui/icons-material/Star';
import VisibilityIcon from '@mui/icons-material/Visibility';
import fork from '../../assets/repo-forked-24.svg';

interface MetricBoxProps {
  count: number,
  type: 'stars' | 'forks' | 'watch',
}

export const MetricBox = ({count, type}: MetricBoxProps) => {
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
          {type === 'watch' && <VisibilityIcon fontSize='small'/>}
          <Typography component='p' sx={{pl: 1, fontWeight: 500, fontSize: '0.9rem'}}> {count} </Typography>
        </Box>
      </Tooltip>
    </Box>
  )
}