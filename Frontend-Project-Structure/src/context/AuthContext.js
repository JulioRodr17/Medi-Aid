import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/authService';

// 1. Crear el Contexto
const AuthContext = createContext();

// 2. Crear el Proveedor (El componente que "envuelve" la app)
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Para saber si estamos cargando la sesión

  // useEffect para cargar la sesión desde localStorage al iniciar la app
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('token');

      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Error al cargar la sesión:", error);
    } finally {
      setLoading(false); // Terminamos de cargar
    }
  }, []);

  // Función de Login
  const login = async (email, password) => {
    // El 'try...catch' es clave aquí. Si authService.login falla,
    // (ej. contraseña incorrecta), lanzará un error que podemos atrapar.
    try {
      // 1. Llamamos al servicio (que usa el dummy data por ahora)
      const userData = await authService.login(email, password);

      // 2. Si tiene éxito, actualizamos los estados
      setUser(userData);
      setToken(userData.token);
      setIsAuthenticated(true);

      // 3. Guardamos en localStorage para persistir la sesión
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', userData.token);

      return true; // Éxito
    } catch (error) {
      console.error("Error en login (Context):", error);
      setIsAuthenticated(false);
      throw error; // Relanzamos el error para que el LoginForm lo atrape
    }
  };

  // Función de Logout
  const logout = () => {
    // 1. Limpiamos los estados
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);

    // 2. Limpiamos el localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  // 3. El "valor" que todos los componentes hijos podrán consumir
  const value = {
    user,
    token,
    isAuthenticated,
    loading, // Exponemos 'loading' para que la app sepa si aún estamos verificando la sesión
    login,
    logout,
    // TODO: BACKEND
    // En un futuro, aquí también irán register, changePassword, etc.
  };

  // 4. Devolvemos el Proveedor con el valor
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// 5. Hook personalizado (forma simple de consumir el contexto)
// Lo ponemos aquí mismo o en un archivo `useAuth.jsx` separado.
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};