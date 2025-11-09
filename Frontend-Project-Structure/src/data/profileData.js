// --- Simulación de la base de datos de estadísticas e historial ---

const DUMMY_STATS = {
  total: 12,
  pending: 2,
  approved: 10,
  rejected: 0 // Añadimos este por si acaso
};

const DUMMY_HISTORY = [
  { id: 1, name: 'Paracetamol', quantity: '2 cajas', status: 'aprobado' },
  { id: 2, name: 'Amoxicilina', quantity: '1 frasco', status: 'pendiente' },
  { id: 3, name: 'Vendas (Insumo)', quantity: '5 unidades', status: 'rechazado' },
  { id: 4, name: 'Ibuprofeno', quantity: '1 caja', status: 'pendiente' },
  // Solo devolvemos las 4 más recientes
];


// --- Simulación de la lógica de la API ---

export const simulateGetProfileStats = (userId) => {
  return new Promise((resolve) => {
    console.log(`Simulando API: Obteniendo stats para usuario ${userId}`);
    setTimeout(() => {
      resolve(DUMMY_STATS);
    }, 450); // Simula una petición rápida
  });
};

export const simulateGetDonationHistoryRecent = (userId) => {
  return new Promise((resolve) => {
    console.log(`Simulando API: Obteniendo historial reciente para usuario ${userId}`);
    setTimeout(() => {
      resolve(DUMMY_HISTORY);
    }, 600);
  });
};