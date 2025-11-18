import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

const PrivateRoute = ({ requiredRole, children }) => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading)	return <div>Cargando sesión...</div>;
  if (!isAuthenticated)	return <Navigate to="/login" replace />;

  const isAdmin = user.admin;
  if ((requiredRole === "admin" && !isAdmin) || (requiredRole === "user" && isAdmin)) return <Navigate to={isAdmin ? "/admin" : "/user"} replace />;

  return children ? children : <Outlet />;
};

export default PrivateRoute;
