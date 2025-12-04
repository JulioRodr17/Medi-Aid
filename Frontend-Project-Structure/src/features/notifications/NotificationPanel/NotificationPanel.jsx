import React, { useState, useEffect } from 'react';
import './NotificationPanel.css';
import { notificationService } from '../../../services/notificationService';
import { useAuth } from "../../../context/AuthContext";
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const NotificationPanel = ({ setHasUnread }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await notificationService.getNotifications(user.id);

        const transformed = data.map(n => ({
          id: n.id,
          title: n.titulo,
          description: n.descripcion,
          type: n.tipo,               // INFO | ALERTA | ERROR | EXITO
          read: n.leida,
          url: n.url,
          time: formatDistanceToNow(new Date(n.fechaRegistro), { addSuffix: true })
        }));

        setNotifications(transformed);
        setHasUnread(transformed.some(n => !n.read));

      } catch (err) {
        console.error("Error al cargar notificaciones:", err);
        setError(err.message || 'No se pudieron cargar las notificaciones.');
      } finally {
        setLoading(false);
      }
    };

    loadNotifications();
  }, [setHasUnread, user.id]);

  const handleMarkAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead(user.id);
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      setHasUnread(false);
    } catch (err) {
      console.error("Error al marcar como leídas:", err);
    }
  };

  // En tu componente
const handleNotificationClick = async (notif, navigate) => {
  try {
    // Llamas a la función que marca como leída
    await notificationService.markAsRead(notif.id);

    // Opcional: actualizar estado local para reflejar que se leyó
    setNotifications(prev =>
      prev.map(n => n.id === notif.id ? { ...n, read: true } : n)
    );

    // Navegar si hay URL
    if (notif.url) {
      navigate(notif.url);
    }
  } catch (err) {
    console.error("Error al manejar notificación:", err);
  }
};

  const renderContent = () => {
    if (loading) return <p className="notif-empty">Cargando...</p>;
    if (error) return <p className="notif-empty notif-error">{error}</p>;
    if (notifications.length === 0) return <p className="notif-empty">No tienes notificaciones.</p>;

    return (
      <ul className="notif-list">
        {notifications.map(notif => (
          <li 
            key={notif.id}
            className={`notif-item ${notif.type} ${notif.read ? 'read' : 'unread'}`}
            onClick={() => handleNotificationClick(notif, navigate)}
          >
            <p className="notif-title">{notif.title}</p>
            <p className="notif-description">{notif.description}</p>
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
        <button className="notif-mark-read-btn" onClick={handleMarkAllAsRead}>
          Marcar todas como leídas
        </button>
      </div>
      {renderContent()}
    </div>
  );
};

export default NotificationPanel;
