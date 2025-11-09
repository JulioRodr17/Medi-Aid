// --- Simulación de la base de datos de medicamentos ---

const DUMMY_MEDICATIONS = Array.from({ length: 25 }, (_, i) => ({
  id: `m${i + 1}`,
  name: `Medicamento ${i + 1}`,
  dosage: `${Math.floor(Math.random() * 10) * 50 + 50} mg`, // 50mg, 100mg...
  description: 'Descripción detallada del medicamento, sus usos, contraindicaciones, y otra información relevante para el paciente o donante.',
  category: 'Analgésico', // Dato para futuro filtro
  stock: Math.floor(Math.random() * 100),
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