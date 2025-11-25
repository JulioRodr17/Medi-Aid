import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import Spinner from "../ui/Spinner/Spinner";

const PrivateRoute = ({ requiredRole, children }) => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) return <Spinner label="Cargando sesión..." />;

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  const isAdmin = user?.role === 'admin';
  if (requiredRole === "admin" && !isAdmin) {
    return <Navigate to="/user" replace />;
  }
  if (requiredRole === "user" && isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  return children ? children : <Outlet />;
};

export default PrivateRoute;
