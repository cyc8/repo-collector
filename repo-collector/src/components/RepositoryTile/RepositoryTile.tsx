import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { MetricBox } from '../MetricBox/MetricBox';


export const RepositoryTile = () => {
  return (
    <Box
      sx={{
        width: 400,
        height: 130,
        borderRadius: 2,
        backgroundColor: '#D8D8D8',
        padding: 1
      }}
    >
      <Typography component='h2' variant='h6'>chrome-extensions-samples</Typography>

      <Box sx={{
        display: 'flex',
        width: 300,
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <MetricBox count={24.2} type='star'/>
        <MetricBox count={500} type='fork'/>
        <MetricBox count={3.4} type='watch'/>
      </Box>

    </Box>
  );
};
