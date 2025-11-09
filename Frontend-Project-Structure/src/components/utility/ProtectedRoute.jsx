import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

const ProtectedRoute = ({ children }) => {
  // 1. Traemos los datos de autenticación de nuestro hook
  const { isAuthenticated, loading } = useAuth();

  // 2. ¿Aún estamos cargando la sesión desde localStorage?
  // Si es así, mostramos un "cargando..." para no redirigir por error.
  if (loading) {
    // TODO: En el futuro, podríamos poner un spinner bonito aquí.
    return <div>Cargando sesión...</div>;
  }

  // 3. Ya terminó de cargar y el usuario NO está autenticado
  if (!isAuthenticated) {
    // Lo "rebotamos" a la página de login.
    // 'replace' evita que el usuario pueda darle "atrás" y volver a la ruta protegida.
    return <Navigate to="/login" replace />;
  }

  // 4. ¡Luz verde! El usuario está autenticado. Dejamos que vea el contenido.
  return children;
};

export default ProtectedRoute;