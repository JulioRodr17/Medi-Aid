import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

const AdminRoute = ({ children }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return <div>Cargando...</div>; // O un <Spinner />
  }

  if (isAuthenticated && user.role === 'admin') {
    return children;
  }

  return <Navigate to="/login" replace />;
};

export default AdminRoute;