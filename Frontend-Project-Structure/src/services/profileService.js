import { httpClient } from './httpClient';
import { 
  simulateGetProfileStats, 
  simulateGetDonationHistoryRecent 
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

export const profileService = {
  getProfileStats,
  getDonationHistoryRecent,
};