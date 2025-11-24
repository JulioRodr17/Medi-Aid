import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/authService';
import { isTokenValid } from '../services/jwtService';

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
        const isDummyToken = storedToken.startsWith("dummy-");

        if (!isDummyToken && !isTokenValid(storedToken)) {
          console.log('Token inválido o expirado. Cerrando sesión.');
          logout();
          return;
        }
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
        setIsAuthenticated(true);
      }

    } catch (error) {
      console.error('Error al cargar la sesión desde localStorage:', error);
      logout();
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

      // Guardamos en localStorage
      localStorage.setItem('authUser', JSON.stringify(userData));
      localStorage.setItem('authToken', responseToken);

    } catch (error) {
      console.error('Error en login (AuthContext):', error);
      throw error;
    }
  };


  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);

    localStorage.removeItem('user');
    localStorage.removeItem('token');
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