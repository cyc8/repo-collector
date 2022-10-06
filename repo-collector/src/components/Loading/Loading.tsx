import Box from '@mui/material/Box';
import { keyframes } from '@mui/system';

interface LoadingProps {
  size?: 'small' | 'medium' | 'big'
}

export default function Loading({size = 'medium'}: LoadingProps) {
  let loadingSize;
  let loadingSpeed;
  let animationDelay;
  
  switch(size){
    case 'small':
      loadingSize = '30px';
      loadingSpeed = '0.8s';
      animationDelay = '0.4s';
      break;
    case 'medium':
      loadingSize = '80px';
      loadingSpeed = '2.0s';
      animationDelay = '-1.0s';
      break;
    case 'big':
      loadingSize = '120px';
      loadingSpeed = '2.0s';
      animationDelay = '-1.0s';
      break;
  }

  const scaleAnimation = keyframes`
    0%,
    100% {
      transform: scale(0);
      -webkit-transform: scale(0);
    }
    50% {
      transform: scale(1);
      -webkit-transform: scale(1);
    }
  `;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center'}}>
      <Box sx={{
        width: loadingSize,
        height: loadingSize,
        position: 'relative',
      }}>
        <Box sx={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          backgroundColor: 'primary.main',
          opacity: 0.6,
          position: 'absolute',
          top: 0,
          left: 0,
          animation: `${scaleAnimation} ${loadingSpeed} infinite ease-in-out`
        }} />

        <Box sx={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          backgroundColor: 'primary.main',
          opacity: 0.6,
          position: 'absolute',
          top: 0,
          left: 0,
          animation: `${scaleAnimation} ${loadingSpeed} infinite ease-in-out`,
          animationDelay: animationDelay
        }} />
      </Box>
    </Box>
  );
}