import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    setLoading(true);
    try {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

      if (storedToken && storedUser) {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
        setIsAuthenticated(true);
        // TODO: BACKEND
        // Aquí iría la lógica para poner el token en el httpClient
        // httpClient.setAuthToken(storedToken);
      }
    } catch (error) {
      console.error('Error al cargar la sesión desde localStorage:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const userData = await authService.login(email, password);

      setUser(userData);
      setToken(userData.token);
      setIsAuthenticated(true);

      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', userData.token);

      // TODO: BACKEND
      // httpClient.setAuthToken(userData.token);

    } catch (error) {
      console.error('Error en login (AuthContext):', error);
      throw error;
    }
  };


  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);

    localStorage.removeItem('authUser');
    localStorage.removeItem('authToken');

    // TODO: BACKEND
    // httpClient.setAuthToken(null);
  };

  const value = {
    user,
    token,
    isAuthenticated,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children} 
    </AuthContext.Provider>
  );
};