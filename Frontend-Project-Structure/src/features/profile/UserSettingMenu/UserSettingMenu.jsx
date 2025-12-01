import React, { useState } from 'react';
import './UserSettingMenu.css';
import PrivacyModal from "../../AvisoDePrivacidad/AvisoDePrivacidad";

const UserSettingsMenu = ({ onEditProfileClick, onChangePasswordClick, onCloseMenu }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditProfile = () => {
    onEditProfileClick(); 
    onCloseMenu(); 
  };

  const handleChangePassword = () => {
    onChangePasswordClick();
    onCloseMenu(); 
  };

  return (
    <>
      <ul className="settings-menu">
        <li className="settings-menu-item">
          <button onClick={handleEditProfile}>Editar Perfil</button>
        </li>

        <li className="settings-menu-item">
          <button onClick={handleChangePassword}>Cambiar Contraseña</button>
        </li>

        <li className="settings-menu-item">
          <button onClick={() => setIsModalOpen(true)}>
            Política de Privacidad
          </button>
        </li>
      </ul>

      {/* Modal de privacidad */}
      <PrivacyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default UserSettingsMenu;
