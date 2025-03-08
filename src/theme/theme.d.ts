import 'react';
import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    mode: 'light' | 'dark';
    toggleTheme: () => void;
  }

  interface ThemeOptions {
    mode?: 'light' | 'dark';
    toggleTheme?: () => void;
  }
}
