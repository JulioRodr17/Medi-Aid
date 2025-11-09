import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';

/**
 * Hook personalizado para acceder fácilmente al contexto de autenticación.
 * @returns {object} El valor del AuthContext (user, token, login, logout, etc.)
 */
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};