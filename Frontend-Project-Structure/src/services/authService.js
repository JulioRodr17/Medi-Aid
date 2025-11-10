import { httpClient } from './httpClient';
import { simulateRegister , simulateForgotPassword, simulateResetPassword} from '../data/userData';

// --- ¡EL INTERRUPTOR MÁGICO! ---
// true = Usa los archivos de src/data/
// false = Llama a la API real de Spring Boot
const USE_DUMMY_DATA = true;
//================================================== SERVICIO LOGIN ==================================================
const login = (email, password) => {
  // Construimos el objeto para enviar
  const usr = {
    correo: email,
    contrasena: password,
  };
  // Se llama la api con el usuario
  return httpClient.post('/usuarios/login', usr);
};

//================================================== SERVICIO REGISTER ==================================================
const register = (registerData) => {
  if (USE_DUMMY_DATA) {
    return simulateRegister(registerData);
  }

  // TODO: BACKEND
  return httpClient.post('/auth/register', registerData);
};

//================================================== SERVICIO OLVIDAR CONTRASEÑA ==================================================
const forgotPassword = (email) => {
  if (USE_DUMMY_DATA) {
    return simulateForgotPassword(email);
  }
  return httpClient.post('/auth/forgot-password', { email });
};

//================================================== SERVICIO RESETEAR CONTRASEÑA ==================================================
const resetPassword = (token, newPassword) => {
  if (USE_DUMMY_DATA) {
    return simulateResetPassword(token, newPassword);
  }
  return httpClient.post('/auth/reset-password', { token, newPassword });
};

//================================================== EXPORTAR SERVICIOS ==================================================
export const authService = {
  login,
  register,
  forgotPassword,
  resetPassword,
};
//======================================================================================================================================================