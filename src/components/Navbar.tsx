import { AppBar, Toolbar, Button, IconButton } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useThemeContext } from "../context/ThemeContext";
import Cookies from "js-cookie";
// Import SVG as Component
import logo from "../assets/logo.svg";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const isAuthenticated = Boolean(Cookies.get("userId"));
  const { mode, toggleTheme } = useThemeContext();

const handleAuth = () => {
  if (isAuthenticated) {
    Cookies.remove("userId");
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
        <div style={{flex:1}}>
        <img
          src={logo}
          alt="Logo"
          style={{
            height: 75,
            width: 160,
            marginRight: 10,
          }}
        />
        </div>
        <IconButton
          onClick={toggleTheme}
          sx={{ color: "#fff", marginRight: 2 }}
        >
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
