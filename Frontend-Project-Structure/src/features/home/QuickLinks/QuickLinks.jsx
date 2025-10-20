import React from 'react';
import './QuickLinks.css';

// --- Íconos SVG para la sección de Contacto ---
const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.494v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.323-1.325z"/>
  </svg>
);

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const WebIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="2" y1="12" x2="22" y2="12"></line>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
    </svg>
);


const QuickLinks = () => {
  return (
    <div className="quick-links-panel">
      <h3 className="quick-links-title">Contacto</h3>
      <ul className="quick-links-list">
        
        {/* -- Redes y Enlaces -- */}
        <li className="quick-links-item">
          <div className="quick-links-icon fb-icon"><FacebookIcon /></div>
          <a href="https://www.facebook.com/profile.php?id=61581841794668" target='_blank' rel="noopener noreferrer">
            Facebook
          </a>
        </li>
        <li className="quick-links-item">
          <div className="quick-links-icon"><WebIcon /></div>
          <a href="https://www.escom.ipn.mx/htmls/escomunidad/serviciosSalud.php" target='_blank' rel="noopener noreferrer">
            Sitio Web
          </a>
        </li>
        <li className="quick-links-item">
          <div className="quick-links-icon"><PhoneIcon /></div>
          <span>Telefono: 57296000 Ext. 52014</span>
        </li>
        
        {/* -- Separador -- */}
        <li className="quick-links-separator"></li>

        {/* -- Ubicación -- */}
        <li className="quick-links-location">
          Nos ubicamos en el edificio de gobierno, planta baja.<br/>
          Junto a Gestión Escolar, último cubículo a mano derecha.
        </li>
      </ul>
    </div>
  );
};

export default QuickLinks;
