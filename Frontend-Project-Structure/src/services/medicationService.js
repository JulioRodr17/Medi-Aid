import { httpClient } from './httpClient';
import { simulateGetMedications, simulateGetScarceMedications } from '../data/medicationData';

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

export const medicationService = {
  getMedications,
  getScarceMedications,
};