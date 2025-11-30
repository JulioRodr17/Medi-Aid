						  
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import Spinner from "../ui/Spinner/Spinner";

const PublicRoute = () => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) return <Spinner label="Validando sesión..." />;

  if (!isAuthenticated) return <Outlet />;
   
  const isAdmin = user.admin;
  return <Navigate to={isAdmin ? "/admin" : "/user"} replace />;
};

export default PublicRoute;
