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
    // Solo validar si hay token (usuario logueado)
    if (token && !isTokenValid(token)) {
      alert("Sesión expirada, cerrando sesión...");
      logout(); // limpia estado y localStorage
      navigate("/login", { replace: true });
    }
  }, [location.pathname, token, logout, navigate]);

  return null; // No renderiza nada
};

export default AuthWatcher;
