import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import './ProfilePage.css';

import { profileService } from '../../services/profileService.js';

// Importaciones de componentes
import UserProfileHeader from '../../features/profile/UserProfileHeader/UserProfileHeader';
import UserContactInfo from '../../features/profile/UserContactInfo/UserContactInfo';
import Modal from '../../components/ui/Modal/Modal';
import EditProfileForm from '../../features/profile/EditProfileForm/EditProfileForm';
import ChangePasswordForm from '../../features/profile/ChangePasswordForm/ChangePasswordForm';
import Button from '../../components/ui/button/Button';

// --- VISTAS ESPECÍFICAS DE ROL ---
// Importamos los componentes que el 'user' normal ve
import UserDonationStats from '../../features/profile/UserDonationStats/UserDonationStats';
import UserDonationHistory from '../../features/profile/UserdDonationHistory/UserDonationHistory.jsx';
import AdminDonationChart from '../../features/profile/AdminDonationChart/AdminDonationChart';


const ProfilePage = () => {
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
        // Pedimos los datos (los servicios dummy ya están listos)
        const [statsData, historyData] = await Promise.all([
          profileService.getProfileStats(user.id),
          profileService.getDonationHistoryRecent(user.id)
        ]);

        setStats(statsData);
        setHistory(historyData);

      } catch (err) {
        setError(err.message || 'No se pudieron cargar los datos.');
      } finally {
        setLoading(false);
      }
    };

    loadProfileData();
  }, [user]);


  const handleLogout = () => {
    logout();
  };

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

  if (loading || !user) {
    return <div className="page-loading">Cargando datos del usuario...</div>;
  }
  
  if (error) {
    return <div className="page-error">Error: {error}</div>;
  }

  return (
    <>
      <div className="profile-page">
        <UserProfileHeader 
          name={user.nombre + " " + user.apellidoPaterno + " " + user.apellidoMaterno} 
          role={user.rol} 
          avatarUrl={user.foto} 
          onEditProfileClick={() => setIsEditModalOpen(true)}
          onChangePasswordClick={() => setIsChangePasswordModalOpen(true)}
        />


        {loading ? (<div className="page-loading">Cargando datos del perfil...</div>) : error ? (<div className="page-error">Error: {error}</div>) : (
          <>
            <div className="profile-page-content">
              <div className="profile-main-column">
                {user.rol === 'admin' ? (<AdminDonationChart stats={stats} />) : (
                  <>
                    <UserDonationStats total={stats.total} pending={stats.pending} approved={stats.approved} />
                    <UserDonationHistory history={history} />
                  </>
              )}
              </div>
              <div className="profile-sidebar-column">
                <UserContactInfo email={user.correo} phone={user.telefono} />
              </div>
            </div>
          </>
        )}

        <div className="logout-section">
          <Button variant="secondary" onClick={handleLogout}>
            Cerrar Sesión
          </Button>
        </div>
      </div>

      <Modal title="Editar Perfil" isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <EditProfileForm currentUser={user} onSave={handleSaveProfile} onCancel={() => setIsEditModalOpen(false)}/>
      </Modal>

      <Modal title="Cambiar Contraseña" isOpen={isChangePasswordModalOpen} onClose={() => setIsChangePasswordModalOpen(false)}>
        <ChangePasswordForm onSave={handleSavePassword} onCancel={() => setIsChangePasswordModalOpen(false)}/>
      </Modal>
    </>
  );
};

export default ProfilePage;
