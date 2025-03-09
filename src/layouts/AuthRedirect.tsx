import { Navigate } from 'react-router-dom';

interface AuthRedirectProps {
  isAuthenticated: boolean;
}

const AuthRedirect: React.FC<AuthRedirectProps> = ({ isAuthenticated }) => {
  return isAuthenticated ? <Navigate to="/stores" replace /> : <Navigate to="/login" replace />;
};

export default AuthRedirect;
