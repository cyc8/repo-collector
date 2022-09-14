import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './App.css';
import { RepositoryTile } from './components/RepositoryTile/RepositoryTile';

function App() {
  return (
    <Box sx={{p: 3}}>
      <Typography component='h1' variant='h4' sx={{mb: 3, fontWeight: 700}}>
        Repo Collector
      </Typography>
      <RepositoryTile />
    </Box>
  );
}

export default App;
