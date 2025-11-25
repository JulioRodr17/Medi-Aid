import { httpClient } from './httpClient';
import {
  simulateGetCategories,
  simulateGetMedications,
  simulateGetScarceMedications,
  simulateAddMedication,
  simulateUpdateMedication,
  simulateDeleteMedication,
  simulateSetScarceStatus
} from '../data/medicationData';

// true = usa datos dummy de src/data
const USE_DUMMY_DATA = true;

const getMedications = (filters = {}) => {
  if (USE_DUMMY_DATA) {
    return simulateGetMedications(filters);
  }
  return httpClient.get('/medicamentos/filtrados', { params: filters });
};

// Obtener nombres
const getNombres = (filters = {}) => {
  return httpClient.get('/medicamentos/nombres', { params: filters });
};

// Servicio para entregar las categorías de medicamentos
export const getCategories = async () => {
  if (USE_DUMMY_DATA) {
    return simulateGetCategories();
  }
  return httpClient.get('/medicamentos/categorias');
};

// Medicamentos escasos
const getScarceMedications = () => {
  if (USE_DUMMY_DATA) {
    return simulateGetScarceMedications();
  }
  return httpClient.get('/medicamentos/scarce');
};

const addMedication = (medData) => {
  if (USE_DUMMY_DATA) {
    return simulateAddMedication(medData);
  }
  return httpClient.post('/medicamentos/agregar', medData);
};

const updateMedication = (medData) => {
  if (USE_DUMMY_DATA) {
    return simulateUpdateMedication(medData.id, medData);
  }
  return httpClient.put('/medicamentos/actualizar', medData);
};

const deleteMedication = (medId) => {
  if (USE_DUMMY_DATA) {
    return simulateDeleteMedication(medId);
  }
  return httpClient.delete(`/medicamentos/inactivar/${medId}`);
};

const setScarceStatus = (medId, isScarce) => {
  if (USE_DUMMY_DATA) {
    return simulateSetScarceStatus(medId, isScarce);
  }
  return httpClient.post('/medicamentos/scarce', { id: medId, isScarce });
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
  setScarceStatus,
};