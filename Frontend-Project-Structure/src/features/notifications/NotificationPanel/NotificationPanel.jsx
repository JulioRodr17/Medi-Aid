import React from 'react';
import './NotificationPanel.css';

// TODO: BACKEND
// Estos son datos de ejemplo. En un futuro, esta lista
// se debería cargar (fetch) desde la API.
const dummyNotifications = [
  { id: 1, text: 'Tu donación de Paracetamol fue aprobada.', time: 'hace 5 min' },
  { id: 2, text: 'Nuevos consejos de salud disponibles en el blog.', time: 'hace 1 hora' },
  { id: 3, text: 'Tu donación de Gasas fue rechazada.', time: 'hace 3 horas' },
];

const NotificationPanel = ({ setHasUnread }) => {

  const handleMarkAllAsRead = () => {
    // TODO: BACKEND
    // Aquí se haría una llamada a la API para marcar
    // todas las notificaciones como leídas en la base de datos.
    console.log('Marcando todas como leídas...');
    setHasUnread(false);
  };

  return (
    <div className="notification-panel">
      <div className="notif-header">
        <h3>Notificaciones</h3>
        <button 
          className="notif-mark-read-btn"
          onClick={handleMarkAllAsRead}
        >
          Marcar todas como leídas
        </button>
      </div>
      <ul className="notif-list">
        {dummyNotifications.length > 0 ? (
          dummyNotifications.map(notif => (
            <li key={notif.id} className="notif-item">
              <p className="notif-text">{notif.text}</p>
              <span className="notif-time">{notif.time}</span>
            </li>
          ))
        ) : (
          <li className="notif-empty">No tienes notificaciones nuevas.</li>
        )}
      </ul>
    </div>
  );
};

export default NotificationPanel;
