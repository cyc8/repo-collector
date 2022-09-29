import Box from '@mui/material/Box';
import { keyframes } from '@mui/system';

export default function Loading() {
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
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 4}}>
      <Box sx={{
        width: '80px',
        height: '80px',
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
          animation: `${scaleAnimation} 2.0s infinite ease-in-out`
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
          animation: `${scaleAnimation} 2.0s infinite ease-in-out`,
          animationDelay: '-1.0s'
        }} />
      </Box>
    </Box>
  );
}