// src/components/AuthWatcher.jsx
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { isTokenValid } from "../../services/jwtService.js";

const AuthWatcher = () => {
  const { token, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const isDummyToken = typeof token === 'string' && token.startsWith("dummy-");

    // Solo validar si hay token (usuario logueado)
    if (token && !isDummyToken && !isTokenValid(token)) {
      console.warn("AuthWatcher: Token real expirado o inválido.");
      alert("Sesión expirada, cerrando sesión...");
      logout(); 
      navigate("/login", { replace: true });
    }
  }, [location.pathname, token, logout, navigate]);

  return null; // No renderiza nada
};

export default AuthWatcher;
