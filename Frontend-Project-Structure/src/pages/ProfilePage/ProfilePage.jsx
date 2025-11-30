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
    if (!user) {
      return;
    }

    const loadProfileData = async () => {
      try {
        setLoading(true);
        setError(null);
        // Definimos las promesas base (Stats siempre se cargan)
        const promises = [profileService.getProfileStats(user.id)];

        // Si es usuario normal, también cargamos su historial
        if (user.admin) {
          promises.push(profileService.getDonationHistoryRecent(user.id));
        }

        // Ejecutamos las peticiones
        const results = await Promise.all(promises);
        
        // Asignamos resultados
        setStats(results[0]); // El primero siempre es stats
        
        if (user.admin) {
          setHistory(results[1]); // El segundo es history (solo si no es admin)
        }

      } catch (err) {
        console.error(err);
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
    console.log('Guardando perfil:', updatedData);
    setIsEditModalOpen(false); // Cierra el modal
  };

  const handleSavePassword = (passwordData) => {
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
                {user.admin? (
                  <AdminDonationChart stats={stats} />) : (
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