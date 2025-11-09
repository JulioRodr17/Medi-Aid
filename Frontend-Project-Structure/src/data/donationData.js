// --- Simulación de la base de datos de donaciones ---

let DUMMY_DONATIONS = [
  { id: 1, name: 'Paracetamol', quantity: '2 cajas', status: 'aprobado' },
  { id: 2, name: 'Amoxicilina', quantity: '1 frasco', status: 'pendiente' },
  { id: 3, name: 'Vendas (Insumo)', quantity: '5 unidades', status: 'rechazado' },
  { id: 4, name: 'Ibuprofeno', quantity: '1 caja', status: 'pendiente' },
];

// --- Simulación de la lógica de la API ---

export const simulateGetDonationHistory = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...DUMMY_DONATIONS]); // Devuelve una copia
    }, 600);
  });
};

export const simulatePostDonation = (donationData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newDonation = {
        id: Math.floor(Math.random() * 1000),
        name: donationData.nombre,
        quantity: donationData.cantidadDonada,
        status: 'pendiente' // Todas las nuevas donaciones inician pendientes
      };
      DUMMY_DONATIONS.push(newDonation);
      console.log('Simulando API: Donación recibida', newDonation);
      resolve({ success: true, message: 'Donación registrada con éxito.' });
    }, 800);
  });
};