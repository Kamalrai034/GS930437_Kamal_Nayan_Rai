import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const ProtectedLayout = () => {
  const token = Cookies.get("userId");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="app-container">
      <Navbar />
      <Sidebar />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default ProtectedLayout;
