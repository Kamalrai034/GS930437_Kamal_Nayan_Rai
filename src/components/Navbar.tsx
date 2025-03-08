import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
  } from "@mui/material";
  import { Brightness4, Brightness7 } from "@mui/icons-material";
  import { useNavigate } from "react-router-dom";
  import { useThemeContext } from "../context/ThemeContext";
  
  const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const isAuthenticated = Boolean(localStorage.getItem("token"));
    const { mode, toggleTheme } = useThemeContext();
  
    const handleAuth = () => {
      if (isAuthenticated) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        navigate("/login");
      }
    };
  
    return (
      <AppBar
        position="fixed"
        className="navbar"
        sx={{
          backgroundColor: mode === "dark" ? "#1e1e1e" : "#3f5366",
          color: "#fff",
          boxShadow: "none",
        }}
      >
        <Toolbar className="navbar-toolbar">
          <Typography className="navbar-logo">Company Logo</Typography>
  
          <IconButton onClick={toggleTheme} sx={{ color: "#fff", marginRight: 2 }}>
            {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
  
          <Button className="navbar-button" onClick={handleAuth}>
            {isAuthenticated ? "Sign Out" : "Sign In"}
          </Button>
        </Toolbar>
      </AppBar>
    );
  };
  
  export default Navbar;
  