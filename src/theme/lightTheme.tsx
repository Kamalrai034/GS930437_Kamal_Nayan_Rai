import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#000000',
    },
  },
});

export const setLightModeColors = () => {
  document.documentElement.style.setProperty('--background-color', '#f5f5f5');
  document.documentElement.style.setProperty('--text-color', '#000000');
  document.documentElement.style.setProperty('--primary-color', '#1976d2');
  document.documentElement.style.setProperty('--primary-hover-color', '#1565c0');

  document.documentElement.style.setProperty('--navbar-bg-color', '#3f5366');
  document.documentElement.style.setProperty('--navbar-text-color', '#ffffff');
  document.documentElement.style.setProperty('--navbar-button-text-color', '#ffffff');
  document.documentElement.style.setProperty('--navbar-button-hover-color', '#0d47a1');

  document.documentElement.style.setProperty('--sidebar-bg-color', '#e0e0e0');
  document.documentElement.style.setProperty('--sidebar-text-color', '#000000');
  document.documentElement.style.setProperty('--sidebar-hover-color', '#cccccc');
  document.documentElement.style.setProperty('--sidebar-active-color', '#bbbbbb');

  document.documentElement.style.setProperty('--content-bg-color', '#ffffff');
};

export default lightTheme;
