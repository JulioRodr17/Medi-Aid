import React from 'react';
import './UserContactInfo.css';

const UserContactInfo = ({ email, phone }) => {
  return (
    <div className="profile-card">
      <h3 className="profile-card-title">Información de Contacto</h3>
      <ul className="contact-list">
        <li>
          <span className="contact-label">Correo Institucional:</span>
          <span className="contact-value">{email}</span>
        </li>
        <li>
          <span className="contact-label">Teléfono:</span>
          <span className="contact-value">{phone || 'No registrado'}</span>
        </li>
      </ul>
    </div>
  );
};

export default UserContactInfo;
