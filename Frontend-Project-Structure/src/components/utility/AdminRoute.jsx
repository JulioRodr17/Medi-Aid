import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import Spinner from '../ui/Spinner/Spinner';

const AdminRoute = ({ children }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return <Spinner label="Cargando sesión..." />;
  }

  console.log("AdminRoute Check:", { isAuthenticated, role: user?.role });


  if (isAuthenticated && user.role === 'admin') {
    return children;
  }

  return <Navigate to="/login" replace />;
};

export default AdminRoute;