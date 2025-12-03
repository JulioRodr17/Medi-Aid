import { httpClient } from './httpClient';

const getProfileStats = (userId) => {
  return httpClient.get(`/donacion/stats/${userId}`); 
};

const getDonationHistoryRecent = (userId) => {
  return httpClient.get(`/donacion/historial/${userId}`);
};

// --- ¡NUEVO! ---
const updateProfile = (userId, profileData) => {
  profileData.id = userId;
  return httpClient.put(`/usuarios/changePhone`, profileData);
};

// --- ¡NUEVO! ---
const changePassword = (userId, passwordData) => {
  passwordData.id = userId;
  return httpClient.put(`/usuarios/changePassword`, passwordData);
};

export const profileService = {
  getProfileStats,
  getDonationHistoryRecent,
  updateProfile,
  changePassword,
};