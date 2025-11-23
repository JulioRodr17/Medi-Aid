import { httpClient } from './httpClient';
import { simulateForgotPassword, simulateResetPassword} from '../data/userData';

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
  return httpClient.post('/usuarios/registro', registerData);
};

//================================================== SERVICIO OLVIDAR CONTRASEÑA ==================================================
const forgotPassword = (email) => {
  return httpClient.post('/usuarios/forgot-password', { correo: email });
};

//================================================== SERVICIO RESETEAR CONTRASEÑA ==================================================
const resetPassword = (token, newPassword) => {
  return httpClient.post('/usuarios/reset-password', { token: token, contrasena: newPassword });
};

//================================================== EXPORTAR SERVICIOS ==================================================
export const authService = {
  login,
  register,
  forgotPassword,
  resetPassword,
};
//======================================================================================================================================================