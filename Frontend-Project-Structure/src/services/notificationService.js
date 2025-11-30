import { httpClient } from './httpClient';
import { 
  simulateGetNotifications, 
  simulateMarkAllAsRead 
} from '../data/notificationData';

// --- ¡EL INTERRUPTOR MÁGICO! ---
const USE_DUMMY_DATA = true;
// ---------------------------------
const obtenNoticias = (inactivas = false) => {
  return httpClient.get('/noticias/activas', { params: {inactivas: inactivas} });
};

const obtenCards = (inactivas = false) => {
  return httpClient.get('/noticias/cards', { params: {inactivas: inactivas} });
};
/**
 * Obtiene la lista de notificaciones del usuario.
 */
const getNotifications = () => {
  if (USE_DUMMY_DATA) {
    return simulateGetNotifications();
  }

  // TODO: BACKEND
  return httpClient.get('/notifications');
};

/**
 * Marca todas las notificaciones como leídas.
 */
const markAllAsRead = () => {
  if (USE_DUMMY_DATA) {
    return simulateMarkAllAsRead();
  }

  // TODO: BACKEND
  return httpClient.post('/notifications/mark-read');
};

export const notificationService = {
  obtenNoticias,
  obtenCards,
  getNotifications,
  markAllAsRead
};