import { httpClient } from './httpClient';
import { simulateGetDonationHistory, simulatePostDonation } from '../data/donationData';

const USE_DUMMY_DATA = true;

/**
 * Obtiene el historial de donaciones del usuario logueado.
 */
const getDonationHistory = () => {
  if (USE_DUMMY_DATA) {
    return simulateGetDonationHistory();
  }

  // TODO: BACKEND
  // Asume que la API sabe quién es el usuario por su token
  return httpClient.get('/donations/history');
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

export const donationService = {
  getDonationHistory,
  postDonation,
};