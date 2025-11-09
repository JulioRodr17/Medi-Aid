// --- Simulación de la base de datos de notificaciones ---

// TODO: BACKEND - Estos datos vendrán de la API
const DUMMY_NOTIFICATIONS = [
  {
    id: 'n1',
    read: false,
    text: 'Tu donación de Paracetamol ha sido APROBADA.',
    time: 'hace 5 minutos'
  },
  {
    id: 'n2',
    read: false,
    text: 'Tu donación de Vendas (Insumo) fue RECHAZADA.',
    time: 'hace 1 hora'
  },
  {
    id: 'n3',
    read: true,
    text: '¡Bienvenido a Medi-Aid! Gracias por unirte.',
    time: 'hace 1 día'
  }
];

// --- Simulación de la lógica de la API ---

export const simulateGetNotifications = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Devolvemos las notificaciones y un conteo de no leídas
      resolve({
        notifications: DUMMY_NOTIFICATIONS,
        unreadCount: DUMMY_NOTIFICATIONS.filter(n => !n.read).length
      });
    }, 500); // Simula 500ms de retraso
  });
};

// Simula marcar todas como leídas
export const simulateMarkAllAsRead = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      DUMMY_NOTIFICATIONS.forEach(n => n.read = true);
      resolve({ success: true });
    }, 300);
  });
};