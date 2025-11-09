import React, { useState, useEffect } from 'react'; 
import { useAuth } from '../../context/AuthContext.jsx';
import { profileService } from '../../services/profileService.js';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';

import UserProfileHeader from '../../features/profile/UserProfileHeader/UserProfileHeader';
import UserContactInfo from '../../features/profile/UserContactInfo/UserContactInfo';
import UserDonationStats from '../../features/profile/UserDonationStats/UserDonationStats';
import UserDonationHistory from '../../features/profile/UserdDonationHistory/UserDonationHistory';
import Button from '../../components/ui/button/Button';
import Modal from '../../components/ui/Modal/Modal';
import EditProfileForm from '../../features/profile/EditProfileForm/EditProfileForm';
import ChangePasswordForm from '../../features/profile/ChangePasswordForm/ChangePasswordForm';

const ProfilePage = () => {
  const navigate = useNavigate();
  
  const { user, logout } = useAuth(); 

  // --- Estados para los datos cargados ---
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0 });
  const [history, setHistory] = useState([]);
  
  // --- Estados para Carga y Error ---
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);

  useEffect(() => {
    // Si no hay usuario, no intentes cargar nada.
    if (!user) {
      setLoading(false);
      return;
    }

    const loadProfileData = async () => {
      try {
        setLoading(true);
        setError(null);

        // TODO: BACKEND
        // Aquí pasaremos el 'user.id' a los servicios
        // const [statsData, historyData] = await Promise.all([
        //   profileService.getProfileStats(user.id),
        //   profileService.getDonationHistoryRecent(user.id)
        // ]);
        
        // Por ahora, llamamos a los servicios dummy
        const [statsData, historyData] = await Promise.all([
          profileService.getProfileStats(),
          profileService.getDonationHistoryRecent()
        ]);

        setStats(statsData);
        setHistory(historyData);

      } catch (err) {
        console.error("Error al cargar datos del perfil:", err);
        setError(err.message || 'No se pudieron cargar los datos.');
      } finally {
        setLoading(false);
      }
    };

    loadProfileData();
  }, [user]);


  const handleLogout = () => {
    // TODO: BACKEND
    console.log('Cerrando sesión...');
    logout();
  };

  // 5. Función para guardar los cambios del formulario
  const handleSaveProfile = (updatedData) => {
    // TODO: BACKEND
    // Aquí es donde la llamada a la API realmente guardaría los datos.
    console.log('Guardando perfil:', updatedData);
    setIsEditModalOpen(false); // Cierra el modal
  };

  const handleSavePassword = (passwordData) => {
    // TODO: BACKEND
    // Aquí se llamaría a la API para guardar la nueva contraseña.
    // 'passwordData' contiene { currentPassword, newPassword, confirmPassword }
    console.log('Enviando al backend:', passwordData);
    setIsChangePasswordModalOpen(false); // Cierra el modal
  };

  if (!user) {
    // TODO: Poner un spinner bonito aquí.
    return <div>Cargando datos del usuario...</div>;
  }

  return (
    <>
      <div className="profile-page">
        {/* --- 1. Encabezado --- */}
        <UserProfileHeader 
          name={user.name} 
          role={user.role} 
          avatarUrl={user.avatarUrl} 
          onEditProfileClick={() => setIsEditModalOpen(true)}
          onChangePasswordClick={() => setIsChangePasswordModalOpen(true)}
          />


        {loading ? (
          <div className="page-loading">Cargando datos del perfil...</div>
        ) : error ? (
          <div className="page-error">Error: {error}</div>
        ) : (
          <>
            <div className="profile-page-content">
              <div className="profile-main-column">
                <UserDonationStats 
                  total={stats.total} 
                  pending={stats.pending} 
                  approved={stats.approved} 
                />
                <UserDonationHistory 
                  history={history} 
                />
              </div>
              <div className="profile-sidebar-column">
                <UserContactInfo 
                  email={user.email} 
                  phone={user.phone} 
                />
              </div>
            </div>
          </>
        )}

        {/* --- 5. Botón de Logout --- */}
        <div className="logout-section">
          <Button 
            variant="secondary" 
            onClick={handleLogout}
            >
            Cerrar Sesión
          </Button>
        </div>
      </div>

      <Modal 
        title="Editar Perfil"
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      >
        <EditProfileForm 
          currentUser={user}
          onSave={handleSaveProfile}
          onCancel={() => setIsEditModalOpen(false)}
        />
      </Modal>

      <Modal 
        title="Cambiar Contraseña"
        isOpen={isChangePasswordModalOpen}
        onClose={() => setIsChangePasswordModalOpen(false)}
      >
        <ChangePasswordForm 
          onSave={handleSavePassword}
          onCancel={() => setIsChangePasswordModalOpen(false)}
        />
      </Modal>
    </>
  );
};

export default ProfilePage;
