import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1e88e5',
      contrastText: '#ffffff',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
    },
  },
});

export const setDarkModeColors = () => {
  document.documentElement.style.setProperty('--background-color', '#121212');
  document.documentElement.style.setProperty('--text-color', '#ffffff');
  document.documentElement.style.setProperty('--primary-color', '#1e88e5');
  document.documentElement.style.setProperty('--primary-hover-color', '#1565c0');

  document.documentElement.style.setProperty('--navbar-bg-color', '#1e1e1e');
  document.documentElement.style.setProperty('--navbar-text-color', '#ffffff');
  document.documentElement.style.setProperty('--navbar-button-text-color', '#ffffff');
  document.documentElement.style.setProperty('--navbar-button-hover-color', '#1565c0');

  document.documentElement.style.setProperty('--sidebar-bg-color', '#1e1e1e');
  document.documentElement.style.setProperty('--sidebar-text-color', '#ffffff');
  document.documentElement.style.setProperty('--sidebar-hover-color', '#333333');
  document.documentElement.style.setProperty('--sidebar-active-color', '#444444');

  document.documentElement.style.setProperty('--content-bg-color', '#121212');
};

export default darkTheme;
