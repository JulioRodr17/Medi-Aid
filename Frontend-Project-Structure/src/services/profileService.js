import { httpClient } from './httpClient';
import { 
  simulateGetProfileStats, 
  simulateGetDonationHistoryRecent,
  simulateUpdateProfile,   
  simulateChangePassword,   
} from '../data/profileData'; // Importamos las funciones simuladas

// --- ¡EL INTERRUPTORMÁGICO! ---
const USE_DUMMY_DATA = true;
// ---------------------------------

/**
 * Obtiene las estadísticas del perfil del usuario.
 */
const getProfileStats = (userId) => {
  if (USE_DUMMY_DATA) {
    // TODO: BACKEND - Le pasamos el userId por si la simulación lo necesita
    return simulateGetProfileStats(userId);
  }

  // TODO: BACKEND
  // La API real podría necesitar el ID del usuario o tomarlo del token
  return httpClient.get(`/profile/stats`); 
};

/**
 * Obtiene el historial reciente de donaciones del usuario.
 */
const getDonationHistoryRecent = (userId) => {
  if (USE_DUMMY_DATA) {
    // TODO: BACKEND - Le pasamos el userId
    return simulateGetDonationHistoryRecent(userId);
  }

  // TODO: BACKEND
  return httpClient.get(`/donations/history/recent`);
};

// --- ¡NUEVO! ---
const updateProfile = (userId, profileData) => {
  if (USE_DUMMY_DATA) {
    return simulateUpdateProfile(userId, profileData);
  }
  return httpClient.put(`/profile/${userId}`, profileData);
};

// --- ¡NUEVO! ---
const changePassword = (userId, passwordData) => {
  if (USE_DUMMY_DATA) {
    // La simulación pide los 3 campos, pero tu backend podría solo necesitar 2
    return simulateChangePassword(userId, passwordData.currentPassword, passwordData.newPassword);
  }
  return httpClient.post(`/profile/change-password`, passwordData);
};

export const profileService = {
  getProfileStats,
  getDonationHistoryRecent,
  updateProfile,
  changePassword,
};