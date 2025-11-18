// --- Simulación de la base de datos de donaciones ---

let DUMMY_DONATIONS = [
  // TODO: BACKEND - Estos datos vendrán de la API
  { 
    id: 1, 
    userId: 'u1', 
    userName: 'Usuario de Prueba', 
    name: 'Paracetamol', 
    tipo: 'pastilla',
    concentracion: '500 mg',
    cantidadNumerica: 20,
    cantidadDonada: 'caja',
    lote: 'P-123', 
    caducidad: '2025-12-01',
    status: 'aprobado' 
  },
  { 
    id: 2, 
    userId: 'u1', 
    userName: 'Usuario de Prueba',
    name: 'Amoxicilina', 
    tipo: 'jarabe',
    concentracion: '250 mg / 5 ml',
    cantidadNumerica: 1,
    cantidadDonada: 'frasco',
    lote: 'A-456', 
    caducidad: '2026-05-01',
    status: 'pendiente' 
  },
  { 
    id: 3, 
    userId: 'u2', 
    userName: 'Julio Rodríguez',
    name: 'Vendas (Insumo)', 
    tipo: 'insumo',
    concentracion: null,
    cantidadNumerica: 5,
    cantidadDonada: 'unidad',
    lote: null, 
    caducidad: null,
    status: 'rechazado' 
  },
  { 
    id: 4, 
    userId: 'u2', 
    userName: 'Julio Rodríguez',
    name: 'Ibuprofeno', 
    tipo: 'pastilla',
    concentracion: '400 mg',
    cantidadNumerica: 30,
    cantidadDonada: 'caja',
    lote: 'I-789', 
    caducidad: '2025-08-01',
    status: 'pendiente' 
  },
];

// --- Simulación de la lógica de la API ---

/**
 * Simula la obtención del historial de donaciones de UN usuario.
 */
export const simulateGetDonationHistory = (userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Esta lógica ahora funcionará, porque 'd.userId' ya existe
      resolve(DUMMY_DONATIONS.filter(d => d.userId === userId));
    }, 600);
  });
};

/**
 * Simula el registro de una nueva donación.
 */
export const simulatePostDonation = (donationData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newDonation = {
        ...donationData,
        id: Math.max(...DUMMY_DONATIONS.map(d => d.id)) + 1,
        userId: 'u1', // Asumimos que el usuario 'u1' está logueado
        userName: 'Usuario de Prueba',
        status: 'pendiente'
      };
      DUMMY_DONATIONS.push(newDonation);
      resolve({ success: true, message: 'Donación registrada.' });
    }, 800);
  });
};

/**
 * Simula la obtención de TODAS las donaciones pendientes (para el admin).
 */
export const simulateGetPendingDonations = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(DUMMY_DONATIONS.filter(d => d.status === 'pendiente'));
    }, 500);
  });
};

/**
 * Simula la aprobación de una donación.
 */
export const simulateApproveDonation = (donationId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const donation = DUMMY_DONATIONS.find(d => d.id === donationId);
      if (donation) {
        donation.status = 'aprobado';
      }
      resolve({ success: true, donation });
    }, 400);
  });
};

/**
 * Simula el rechazo de una donación.
 */
export const simulateRejectDonation = (donationId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const donation = DUMMY_DONATIONS.find(d => d.id === donationId);
      if (donation) {
        donation.status = 'rechazado';
      }
      resolve({ success: true, donation });
    }, 400);
  });
};