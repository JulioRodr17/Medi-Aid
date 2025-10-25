import React from 'react';
import './UserSettingMenu.css';

// TODO:
// Estos botones/enlaces deberían abrir Modales.
// Por ahora, solo simulan la acción.

const UserSettingsMenu = ({ onEditProfileClick, onCloseMenu }) => {

  const handleEditProfile = () => {
    onEditProfileClick(); // Llama a la función del padre
    onCloseMenu(); // Cierra el menú
  };

  const handleChangePassword = () => {
    // TODO: Implementar Modal de Cambio de Contraseña
    alert('Abriendo Modal de Cambiar Contraseña...');
    onCloseMenu(); // Cierra el menú
  };

  return (
   <ul className="settings-menu">
      <li className="settings-menu-item">
        {/* 2. Conectamos la función */}
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
