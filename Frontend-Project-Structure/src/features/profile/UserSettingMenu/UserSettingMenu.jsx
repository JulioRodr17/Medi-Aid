import React from 'react';
import './UserSettingMenu.css';

// TODO:
// Estos botones/enlaces deberían abrir Modales.
// Por ahora, solo simulan la acción.

const UserSettingsMenu = ({ onEditProfileClick, onChangePasswordClick, onCloseMenu }) => {

  const handleEditProfile = () => {
    onEditProfileClick(); 
    onCloseMenu(); 
  };

  const handleChangePassword = () => {
    onChangePasswordClick();
    onCloseMenu(); 
  };

  return (
   <ul className="settings-menu">
      <li className="settings-menu-item">
        <button onClick={handleEditProfile}>Editar Perfil</button>
      </li>
      <li className="settings-menu-item">
        <button onClick={handleChangePassword}>Cambiar Contraseña</button>
      </li>
      <li className="settings-menu-item">
        <a href="/politica" target="_blank" rel="noopener noreferrer" onClick={onCloseMenu}>
          Política de Privacidad
        </a>
      </li>
    </ul>
  );
};

export default UserSettingsMenu;
