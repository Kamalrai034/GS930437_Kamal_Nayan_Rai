
import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ThemeContextProvider } from "./context/ThemeContext";
import Stores from "./pages/Stores";
import SKUs from "./pages/SKUs";
import ChartPage from "./pages/Chart";
import Planning from "./pages/Planning";

function App() {
  return (
    <ThemeContextProvider>
    <Router>
      <div className="app-container">
        <Navbar />
        <Sidebar />
        <div className="content">
        <Routes>
            <Route path="/stores" element={<Stores />} />
            <Route path="/skus" element={<SKUs />} />
            <Route path="/planning" element={<Planning />} />
            <Route path="/chart" element={<ChartPage />} />
        </Routes>
        </div>
        
      </div>
    </Router>
    </ThemeContextProvider>
  );
}

export default App;
