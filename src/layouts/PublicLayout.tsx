import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const PublicLayout = () => {
  const token = Cookies.get("userId");

  if (token) {
    return <Navigate to="/stores" replace />;
  }

  return (
    <div className="auth-container">
      <Outlet />
    </div>
  );
};

export default PublicLayout;
