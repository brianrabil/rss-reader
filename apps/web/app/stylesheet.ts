import createTheme from '@mui/material/styles/createTheme';

export const muiTheme = (prefersDarkMode: boolean) => createTheme({
  typography: {
    h2: {
      fontFamily: 'Playfair Display'
    },
    body1: {
      fontFamily: 'Inter'
    },
    body2: {
      fontFamily: 'Inter'
    },
    h6: {
      fontFamily: 'Inter'
    },
  },
  palette: {
    mode: prefersDarkMode ? 'dark' : 'light',
  }
})