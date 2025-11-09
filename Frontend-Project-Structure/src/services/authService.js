import { httpClient } from './httpClient';
import { simulateLogin, simulateRegister } from '../data/userData';

// --- ¡EL INTERRUPTOR MÁGICO! ---
// true = Usa los archivos de src/data/
// false = Llama a la API real de Spring Boot
const USE_DUMMY_DATA = true;
// ---------------------------------

/**
 * Maneja el login del usuario.
 * Llama a la simulación o a la API real basado en el interruptor.
 */
const login = (email, password) => {
  if (USE_DUMMY_DATA) {
    return simulateLogin(email, password);
  }
  
  // TODO: BACKEND
  // El endpoint debe coincidir con tu API de Spring Boot
  return httpClient.post('/auth/login', { email, password });
};

/**
 * Maneja el registro de un nuevo usuario.
 */
const register = (registerData) => {
  if (USE_DUMMY_DATA) {
    return simulateRegister(registerData);
  }

  // TODO: BACKEND
  return httpClient.post('/auth/register', registerData);
};

// Exportamos las funciones como un objeto
export const authService = {
  login,
  register,
};