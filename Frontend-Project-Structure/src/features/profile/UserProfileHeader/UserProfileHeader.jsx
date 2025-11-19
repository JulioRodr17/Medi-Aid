import React, { useState, useRef, useEffect } from 'react';
import './UserProfileHeader.css';
import UserSettingsMenu from '../UserSettingMenu/UserSettingMenu';
import { httpClient } from '../../../services/httpClient';
const SettingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
  </svg>
);

const UserProfileHeader = ({ name, role, avatarUrl: initialAvatarUrl, onEditProfileClick, onChangePasswordClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(initialAvatarUrl);
  const menuRef = useRef(null);

  // Lógica de Clic-Fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 🔹 Obtener la foto si es interna
  useEffect(() => {
    const fetchAvatar = async () => {
      if (!initialAvatarUrl) return;

      try {
        // Detecta si es URL externa
        const isExternal = /^https?:\/\//i.test(initialAvatarUrl);
        if (isExternal) {
          setAvatarUrl(initialAvatarUrl);
        } else {
          // URL interna → usar httpClient.getImage
          const url = await httpClient.getImage(initialAvatarUrl);
          setAvatarUrl(url);
        }
      } catch (error) {
        console.error("Error cargando la foto de perfil:", error);
      }
    };

    fetchAvatar();
  }, [initialAvatarUrl]);

  return (
    <header className="profile-header">
      <img src={avatarUrl} alt="Foto de perfil" className="profile-avatar" />
      <div className="profile-info">
        <h1 className="profile-name">{name}</h1>
        <span className="profile-role">{role}</span>
      </div>
      <div className="profile-settings" ref={menuRef}>
        <button 
          className="settings-button" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{ color: '#3921f2' }}
        >
          <SettingsIcon />
          <span>Ajustes</span>
        </button>
        {isMenuOpen && (
          <UserSettingsMenu 
            onEditProfileClick={onEditProfileClick}
            onChangePasswordClick={onChangePasswordClick}
            onCloseMenu={() => setIsMenuOpen(false)}
          />
        )}
      </div>
    </header>
  );
};

export default UserProfileHeader;
