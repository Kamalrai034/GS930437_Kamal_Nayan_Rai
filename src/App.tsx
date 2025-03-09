
import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
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

function App() {
  return (
    <ThemeContextProvider>
      <Router>
        {/* <div className="app-container">
          <Navbar />
          <Sidebar />
          <div className="content"> */}
            <Routes>
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
