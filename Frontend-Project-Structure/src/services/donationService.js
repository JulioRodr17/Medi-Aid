import { httpClient } from './httpClient';
import { simulateGetDonationHistory, 
         simulatePostDonation,
         simulateGetPendingDonations, 
         simulateApproveDonation, 
         simulateRejectDonation  
} from '../data/donationData';

const USE_DUMMY_DATA = true;

/**
 * Obtiene el historial de donaciones del usuario logueado.
 */
const getDonationHistory = (userId) => {
  if (USE_DUMMY_DATA) {
    return simulateGetDonationHistory(userId);
  }

  // TODO: BACKEND
  // El backend debe inferir el userId del token de autenticación
  return httpClient.get(`/donations/history`);
};

/**
 * Envía una nueva donación al backend.
 */
const postDonation = (donationData) => {
  if (USE_DUMMY_DATA) {
    return simulatePostDonation(donationData);
  }
  
  // TODO: BACKEND
  return httpClient.post('/donations', donationData);
};

/**
 * Obtiene TODAS las donaciones pendientes para revisión.
 */
const getPendingDonations = () => {
  if (USE_DUMMY_DATA) {
    return simulateGetPendingDonations();
  }
  // TODO: BACKEND - Ruta protegida para admins
  return httpClient.get('/admin/donations/pending');
};

/**
 * Aprueba una donación específica.
 */
const approveDonation = (donationId) => {
  if (USE_DUMMY_DATA) {
    return simulateApproveDonation(donationId);
  }
  // TODO: BACKEND - Ruta protegida para admins
  return httpClient.post(`/admin/donations/${donationId}/approve`);
};

/**
 * Rechaza una donación específica.
 */
const rejectDonation = (donationId) => {
  if (USE_DUMMY_DATA) {
    return simulateRejectDonation(donationId);
  }
  // TODO: BACKEND - Ruta protegida para admins
  return httpClient.post(`/admin/donations/${donationId}/reject`);
};

export const donationService = {
  getDonationHistory,
  postDonation,
  getPendingDonations,
  approveDonation,
  rejectDonation,
};