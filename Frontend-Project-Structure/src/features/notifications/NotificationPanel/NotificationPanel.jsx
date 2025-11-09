import React, { useState, useEffect } from 'react';
import './NotificationPanel.css';
import { notificationService } from '../../../services/notificationService';


const NotificationPanel = ({ setHasUnread }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await notificationService.getNotifications();
        
        setNotifications(data.notifications);
        setHasUnread(data.unreadCount > 0);

      } catch (err) {
        console.error("Error al cargar notificaciones:", err);
        setError(err.message || 'No se pudieron cargar las notificaciones.');
      } finally {
        setLoading(false);
      }
    };

    loadNotifications();
  }, [setHasUnread]);
  
  const handleMarkAllAsRead = async () => {
    try {
      // TODO: BACKEND - Llamar al servicio
      await notificationService.markAllAsRead();
      
      // Actualizamos el estado localmente para que se refleje al instante
      setNotifications(prevNotifs => 
        prevNotifs.map(n => ({ ...n, read: true }))
      );
      setHasUnread(false); // Apagamos la insignia
      
    } catch (err) {
      console.error("Error al marcar como leídas:", err);
      // (Podríamos mostrar un error pequeño)
    }
  };

  const renderContent = () => {
    if (loading) {
      return <p className="notif-empty">Cargando...</p>;
    }

    if (error) {
      return <p className="notif-empty notif-error">{error}</p>;
    }

    if (notifications.length === 0) {
      return <p className="notif-empty">No tienes notificaciones.</p>;
    }

    return (
      <ul className="notif-list">
        {notifications.map(notif => (
          <li key={notif.id} className={`notif-item ${notif.read ? 'read' : ''}`}>
            <p className="notif-text">{notif.text}</p>
            <span className="notif-time">{notif.time}</span>
          </li>
        ))}
      </ul>
    );
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
        {renderContent()}
      </ul>
    </div>
  );
};

export default NotificationPanel;
