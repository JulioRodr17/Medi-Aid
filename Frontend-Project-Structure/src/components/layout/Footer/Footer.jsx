import React, { useState } from 'react';
import './Footer.css';

import EscomLogo from '../../../assets/svg/escudoESCOM.svg?react';
import IpnLogo from '../../../assets/svg/logotipo_ipn.svg?react';
import PrivacyModal from './../../../features/AvisoDePrivacidad/AvisoDePrivacidad';

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <footer className="footer">
        <div className="footer-main-content">
          <div className="footer-info">
            <h4 className="footer-title">Medi-Aid</h4>
            <p className="footer-description">
              Proyecto de Trabajo Terminal para la obtención del título de Ingeniero en Sistemas Computacionales.
            </p>
            <p className="footer-developers">
              Desarrollado por: <strong> Julio Rodriguez Escogido </strong>, <strong> José Eduardo López García</strong> & <strong>Alma Nayely Vigueras Torres</strong>.
            </p>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} Medi-Aid | Instituto Politécnico Nacional. Todos los derechos reservados.
          </p>

          {/* Política de privacidad en un renglón separado a la derecha */}
          <p className="footer-privacy-link" onClick={() => setIsModalOpen(true)}>
            Política de Privacidad
          </p>
        </div>
      </footer>

      {/* Modal de privacidad */}
      <PrivacyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Footer;
