import React from 'react';
import './QuickLinks.css';

const QuickLinks = () => {
  return (
    <div className="quick-links-panel">
      <h3 className="quick-links-title">Contacto</h3>
      <ul className="quick-links-list">
        <li><a href="https://www.facebook.com/profile.php?id=61581841794668" target='_blank' rel="noopener noreferrer">Facebook</a></li>
        <li><a href="https://www.escom.ipn.mx/htmls/escomunidad/serviciosSalud.php" target='_blank' rel="noopener noreferrer">Sitio Web</a></li>
        <li>Telefono: 57296000 Ext. 52014</li>
        <li>Nos ubicamos en el edificio de gobierno, planta baja.<br/>Junto a Gestion Escolar, ultimo cubiculo a mano derecha.</li>
      </ul>
    </div>
  );
};

export default QuickLinks;
