import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#FF8585',
      main: '#ff3737',
      dark: '#801C1C',
    },
    secondary: {
      light: '#2BFFDF',
      main: '#15B39B',
      dark: '#0F7F6F',
    }
  },
  components: {
    MuiTooltip: {
        styleOverrides: {
          tooltip: {
            fontSize: '0.9rem'
          }
        }  
    },
  }
});

export default theme;