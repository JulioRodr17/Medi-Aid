// --- Simulación de la base de datos de medicamentos ---

// 1. Creamos nuestra lista de 10 categorías
const CATEGORIES = [
  'Analgésico',
  'Antibiótico',
  'Antiinflamatorio',
  'Antihistamínico',
  'Antiácido',
  'Relajante muscular',
  'Antiviral',
  'Broncodilatador',
  'Diurético',
  'Protector gástrico'
];

const getRandomExpiration = () => {
  const year = new Date().getFullYear() + Math.floor(Math.random() * 3) + 1; // Entre 1 y 3 años en el futuro
  const month = (Math.floor(Math.random() * 12) + 1).toString().padStart(2, '0');
  const day = (Math.floor(Math.random() * 28) + 1).toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

let DUMMY_MEDICATIONS = Array.from({ length: 25 }, (_, i) => ({
  id: `m${i + 1}`,
  name: `Medicamento ${i + 1}`,
  dosage: `${Math.floor(Math.random() * 10) * 50 + 50} mg`, // 50mg, 100mg...
  description: 'Descripción detallada del medicamento, sus usos, contraindicaciones, y otra información relevante para el paciente o donante.',
  category: CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)],
  stock: Math.floor(Math.random() * 100),
  expirationDate: getRandomExpiration(), // 
  expiringSoon: Math.random() < 0.2, 
  imageUrl: '' // Usará el placeholder
}));

const DUMMY_SCARCE_MEDS = [
  { id: 'm1', name: 'Paracetamol' },
  { id: 'm3', name: 'Amoxicilina' },
  { id: 'm7', name: 'Loratadina' },
  { id: 'm12', name: 'Omeprazol' },
  { id: 'm5', name: 'Ibuprofeno' }
];

// --- Simulación de la lógica de la API ---

export const simulateGetMedications = (filters = {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Aquí en un futuro podríamos simular la búsqueda y paginación
      console.log('Simulando API: Obteniendo medicamentos con filtros:', filters);
      resolve({
        data: DUMMY_MEDICATIONS,
        totalPages: Math.ceil(DUMMY_MEDICATIONS.length / 8) // Asumiendo 8 por página
      });
    }, 400);
  });
};

export const simulateGetScarceMedications = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(DUMMY_SCARCE_MEDS);
    }, 300);
  });
};

/**
 * Simula la obtención de estadísticas del inventario.
 */
export const simulateGetInventoryStats = () => {
  return new Promise((resolve) => {
    // TODO: BACKEND - Esta lógica debe estar en el backend
    const totalMeds = DUMMY_MEDICATIONS.length;
    const typesOfMeds = CATEGORIES.length;
    const expiringSoon = DUMMY_MEDICATIONS.filter(m => m.expiringSoon).length;
    const scarceMedsCount = DUMMY_SCARCE_MEDS.length;

    setTimeout(() => {
      resolve({
        totalMeds,
        typesOfMeds,
        expiringSoon,
        scarceMedsCount 
      });
    }, 300);
  });
};

/**
 * Simula añadir un nuevo medicamento.
 */
export const simulateAddMedication = (medData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // TODO: BACKEND - Esta lógica debe estar en el backend
      const newMed = {
        ...medData,
        id: `m${Math.floor(Math.random() * 1000)}`,
        expiringSoon: false // Asumimos que no
      };
      DUMMY_MEDICATIONS.unshift(newMed); // Añade al inicio de la lista
      resolve(newMed);
    }, 500);
  });
};

/**
 * Simula la actualización de un medicamento.
 */
export const simulateUpdateMedication = (medId, medData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // TODO: BACKEND - Esta lógica debe estar en el backend
      DUMMY_MEDICATIONS = DUMMY_MEDICATIONS.map(med => 
        med.id === medId ? { ...med, ...medData } : med
      );
      const updatedMed = DUMMY_MEDICATIONS.find(m => m.id === medId);
      resolve(updatedMed);
    }, 500);
  });
};

/**
 * Simula la eliminación de un medicamento.
 */
export const simulateDeleteMedication = (medId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // TODO: BACKEND - Esta lógica debe estar en el backend
      DUMMY_MEDICATIONS = DUMMY_MEDICATIONS.filter(med => med.id !== medId);
      resolve({ success: true, message: 'Medicamento eliminado' });
    }, 500);
  });
};