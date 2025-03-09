
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ThemeContextProvider } from "./context/ThemeContext";
import Stores from "./pages/Stores";
import SKUs from "./pages/SKUs";
import ChartPage from "./pages/Chart";
import Planning from "./pages/Planning";
import PublicLayout from "./layouts/PublicLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedLayout from "./layouts/ProtectedLayout";
import AuthRedirect from "./layouts/AuthRedirect";

function App() {
  const isAuthenticated = !!localStorage.getItem('userId');
  return (
    <ThemeContextProvider>
      <Router>
            <Routes>
            <Route path="/" element={<AuthRedirect isAuthenticated={isAuthenticated} />} />
              <Route element={<PublicLayout />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
              </Route>
              <Route element={<ProtectedLayout />}>
                <Route path="/stores" element={<Stores />} />
                <Route path="/skus" element={<SKUs />} />
                <Route path="/planning" element={<Planning />} />
                <Route path="/chart" element={<ChartPage />} />
              </Route>
            </Routes>
          {/* </div>
        </div> */}
      </Router>
    </ThemeContextProvider>
  );
}

export default App;
