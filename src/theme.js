import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    background: {
      default: '#F5F6FA',
      paper: '#FFFFFF',
    },
    primary: {
      main: '#635BFF', // البنفسجي الأساسي ديال الـ UI
      light: '#EDEDFE',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FF6482',
    },
    text: {
      primary: '#1A1C24',
      secondary: '#7E8494',
    },
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", "Poppins", "Inter", sans-serif',
    h4: {
      fontWeight: 800,
      letterSpacing: '-0.02em',
    },
    h5: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 700,
    },
    subtitle1: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 20, // الحواف الدائرية الواسعة
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          boxShadow: '0 8px 30px rgba(100, 110, 140, 0.05)',
          border: '1px solid rgba(230, 235, 245, 0.8)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          textTransform: 'none',
          fontWeight: 600,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 14px rgba(99, 91, 255, 0.25)',
          },
        },
      },
    },
  },
});

export default theme;