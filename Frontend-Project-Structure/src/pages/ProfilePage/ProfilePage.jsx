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
        
        const resultsHistory = await profileService.getDonationHistoryRecent(user.id);

        const historyArray = Array.isArray(resultsHistory) ? resultsHistory : [];
        const primerosTres = historyArray.slice(0, 3);

        setHistory(primerosTres);

        const resultsStats = await profileService.getProfileStats(user.id);
        console.log(resultsStats);
        setStats(resultsStats);

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
                {user.admin ? (
                  stats && stats.total > 0 ? (
                    <AdminDonationChart stats={stats} />
                  ) : (
                    <div className="empty-admin-container">
                      <div className="empty-admin-card">
                        <div className="empty-icon">📭</div>
                        <h2>No hay registro de donaciones revisadas</h2>
                        <p>
                          Aún no existen donaciones revisadas en el sistema.  
                          Cuando empieces a gestionar solicitudes, aparecerán aquí.
                        </p>
                      </div>
                    </div>
                  )
                ) : (
                  <>
                    <UserDonationStats
                      total={stats?.total || 0}
                      pending={stats?.pendiente || 0}
                      approved={stats?.aprobada || 0}
                      rechazada={stats?.rechazada || 0}
                    />
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