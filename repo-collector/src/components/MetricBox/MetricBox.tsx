import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

import StarIcon from '@mui/icons-material/Star';
import VisibilityIcon from '@mui/icons-material/Visibility';
// import Fork from '../../assets/repo-forked-24.svg';

interface MetricBoxProps {
  count: number,
  type: 'star' | 'fork' | 'watch',
}

export const MetricBox = ({count, type}: MetricBoxProps) => {
  return(
    <Box sx={{
      backgroundColor: 'rgba(255, 255, 255, 0.4)',
      borderRadius: 1,
      width: 90,      
    }}>
      <Box sx={{margin: '2px', display: 'flex'}}>
        {type === 'star' && <StarIcon />}
        {type === 'fork' && <StarIcon />}
        {type === 'watch' && <VisibilityIcon/>}
        <Typography component='p' sx={{pl: 1}}> {count} </Typography>
      </Box>
    </Box>
  )
}