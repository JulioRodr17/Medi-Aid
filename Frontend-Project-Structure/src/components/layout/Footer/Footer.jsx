import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Medi-Aid. Todos los derechos reservados.</p>
        <div className="footer-links">
          <a href="/privacidad">Política de Privacidad</a>
          <span>|</span>
          <a href="/terminos">Términos de Servicio</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
