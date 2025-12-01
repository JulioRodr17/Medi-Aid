import { httpClient } from './httpClient';

const getMedications = (filters = {}) => {
  return httpClient.get('/medicamentos/filtrados', { params: filters });
};

const getMedWithPhoto = async (filters = {}) => {
  console.log(filters);
  const response = await httpClient.get('/medicamentos/filtrados', { params: filters });

  // Iteramos sobre response.data (el array de medicamentos)
  const dataConSrc = await Promise.all(
    response.data.map(async (med) => {
      const src = med.url ? await httpClient.getImage(med.url) : null;
      return { ...med, src };  // Mantenemos todo y agregamos src
    })
  );

  // Devolvemos igual estructura que llega, reemplazando data con la nueva iteración
  return { ...response, data: dataConSrc };
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
  for (let pair of medData.entries()) {
  console.log(pair[0], pair[1]);
}
  return httpClient.put('/medicamentos/actualiza', medData);
};

const deleteMedication = (medId) => {
  return httpClient.delete(`/medicamentos/inactivar/${medId}`);
};


export const medicationService = {
  // Usuario
  getCategories,
  getMedications,
  getMedWithPhoto,
  getNombres,
  getScarceMedications,
  // Admin
  addMedication,
  updateMedication,
  deleteMedication,
};