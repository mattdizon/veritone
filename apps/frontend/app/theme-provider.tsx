'use client';

import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { FONTS } from './theme/constants';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1871E8',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: FONTS.nunito,
  },
  fonts: FONTS,
});

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
};

export default ThemeProvider;


