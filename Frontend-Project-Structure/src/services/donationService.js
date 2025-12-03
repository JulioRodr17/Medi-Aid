import { httpClient } from './httpClient';

const USE_DUMMY_DATA = true;

const getDonationHistory = (userId) => {
  return httpClient.get(`/donacion/historial/${userId}`);
};

const postDonation = (donationData) => {
  return httpClient.post('/donacion/agregar', donationData);
};

const getPendingDonations = () => {
  return httpClient.get('/donacion/pendientes');
};

const approveDonation = (data) => {
  console.log(data);
  return httpClient.put(`/donacion/aprobar`, data);
};

const rejectDonation = (data) => {
  return httpClient.put(`/donacion/rechazar`, data);
};

export const donationService = {
  getDonationHistory,
  postDonation,
  getPendingDonations,
  approveDonation,
  rejectDonation,
};