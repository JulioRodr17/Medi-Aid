import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

const PublicRoute = () => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) return <div>Cargando sesión...</div>;
  if (!isAuthenticated) return <Outlet />;

  const isAdmin = user.admin;
  return <Navigate to={isAdmin ? "/admin" : "/user"} replace />;
};

export default PublicRoute;
