import { httpClient } from './httpClient';
import { 
  simulateGetMedications, 
  simulateGetScarceMedications,
  simulateGetInventoryStats,
  simulateAddMedication,
  simulateUpdateMedication,
  simulateDeleteMedication
} from '../data/medicationData';
const USE_DUMMY_DATA = true;



/**
 * Obtiene la lista de medicamentos (paginada/filtrada).
 */
const getMedications = (filters = {}) => {
  if (USE_DUMMY_DATA) {
    return simulateGetMedications(filters);
  }

  // TODO: BACKEND
  // En un futuro, los filtros se pasarán como query params
  // ej. /medications?page=1&search=paracetamol
  return httpClient.get('/medications', { params: filters });
};

/**
 * Obtiene la lista de medicamentos escasos.
 */
const getScarceMedications = () => {
  if (USE_DUMMY_DATA) {
    return simulateGetScarceMedications();
  }

  // TODO: BACKEND
  return httpClient.get('/medications/scarce');
};

const getInventoryStats = () => {
  if (USE_DUMMY_DATA) {
    return simulateGetInventoryStats();
  }
  // TODO: BACKEND
  return httpClient.get('/admin/inventory/stats');
};

const addMedication = (medData) => {
  if (USE_DUMMY_DATA) {
    return simulateAddMedication(medData);
  }
  // TODO: BACKEND
  return httpClient.post('/admin/inventory', medData);
};

const updateMedication = (medId, medData) => {
  if (USE_DUMMY_DATA) {
    return simulateUpdateMedication(medId, medData);
  }
  // TODO: BACKEND
  return httpClient.put(`/admin/inventory/${medId}`, medData);
};

const deleteMedication = (medId) => {
  if (USE_DUMMY_DATA) {
    return simulateDeleteMedication(medId);
  }
  // TODO: BACKEND
  return httpClient.delete(`/admin/inventory/${medId}`);
};


export const medicationService = {
  // Usuario
  getMedications,
  getScarceMedications,
  // Admin
  getInventoryStats,
  addMedication,
  updateMedication,
  deleteMedication,
};