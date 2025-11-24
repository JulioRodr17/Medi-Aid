import { httpClient } from './httpClient';

const getMedications = (filters = {}) => {
  return httpClient.get('/medicamentos/filtrados', { params: filters });
};

// Obtener nombres
const getNombres = (filters = {}) => {
  return httpClient.get('/medicamentos/nombres', { params: filters });
};

// Servicio para entregar las categorías de medicamentos
export const getCategories = async () => {
  return httpClient.get('/medicamentos/categorias');
};

// Medicamentos escasos
const getScarceMedications = () => {
  return httpClient.get('/medicamentos/scarce');
};

const addMedication = (medData) => {
  return httpClient.post('/medicamentos/agregar', medData);
};

const updateMedication = (medData) => {
  return httpClient.put('/medicamentos/actualizar', medData);
};

const deleteMedication = (medId) => {
  return httpClient.delete(`/medicamentos/inactivar/${medId}`);
};


export const medicationService = {
  // Usuario
  getCategories,
  getMedications,
  getNombres,
  getScarceMedications,
  // Admin
  addMedication,
  updateMedication,
  deleteMedication,
};