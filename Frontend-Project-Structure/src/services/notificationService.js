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


const postNotifications = (data) => {
    return httpClient.post('/notifications/nueva', data);
}

const getNotifications = (id) => {
  return httpClient.get(`/notifications/todas/${id}`);
};

const markAsRead = (id) => {
  return httpClient.put(`/notifications/mark-read/${id}`);
};

const markAllAsRead = (id) => {
  return httpClient.put(`/notifications/markAll-read/${id}`);
};


export const notificationService = {
  obtenNoticias,
  obtenCards,
  postNotifications,
  getNotifications,
  markAsRead,
  markAllAsRead
};