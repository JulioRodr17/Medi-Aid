import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';

// 1. Importamos todos los "muebles" que formarán la página
import UserProfileHeader from '../../features/profile/UserProfileHeader/UserProfileHeader';
import UserContactInfo from '../../features/profile/UserContactInfo/UserContactInfo';
import UserDonationStats from '../../features/profile/UserDonationStats/UserDonationStats';
import UserDonationHistory from '../../features/profile/UserdDonationHistory/UserDonationHistory';
import Button from '../../components/ui/button/Button';
import Modal from '../../components/ui/Modal/Modal';
import EditProfileForm from '../../features/profile/EditProfileForm/EditProfileForm';
import ChangePasswordForm from '../../features/profile/ChangePasswordForm/ChangePasswordForm';

// TODO: BACKEND
// Esta información vendrá de la API (del usuario que esté logueado)
const dummyUser = {
  name: 'Julio Rodríguez',
  role: 'Alumno',
  email: 'jrodriguez@alumno.escom.ipn.mx',
  phone: '55-1234-5678',
  avatarUrl: 'https://via.placeholder.com/150' // Placeholder para la foto
};

// TODO: BACKEND
// Estos datos también vendrán de un endpoint de estadísticas
const dummyStats = {
  total: 12,
  pending: 2,
  approved: 10
};

const ProfilePage = () => {
  const navigate = useNavigate();
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState(dummyUser);

  const handleLogout = () => {
    // TODO: BACKEND
    // Aquí se llamaría a la API para invalidar el token/sesión
    console.log('Cerrando sesión...');
    // Redirigimos al login
    navigate('/login');
  };

  // 5. Función para guardar los cambios del formulario
  const handleSaveProfile = (newData) => {
    // TODO: BACKEND
    // Aquí es donde la llamada a la API realmente guardaría los datos.
    // Por ahora, solo actualizamos el estado local para ver el cambio al instante.
    setCurrentUser(prev => ({
      ...prev,
      name: newData.name,
      phone: newData.phone
    }));
    setIsEditModalOpen(false); // Cierra el modal
  };

  const handleSavePassword = (passwordData) => {
    // TODO: BACKEND
    // Aquí se llamaría a la API para guardar la nueva contraseña.
    // 'passwordData' contiene { currentPassword, newPassword, confirmPassword }
    console.log('Enviando al backend:', passwordData);
    setIsChangePasswordModalOpen(false); // Cierra el modal
  };

  return (
    <>
      <div className="profile-page">
        {/* --- 1. Encabezado --- */}
        <UserProfileHeader 
          name={dummyUser.name} 
          role={dummyUser.role} 
          avatarUrl={dummyUser.avatarUrl} 
          onEditProfileClick={() => setIsEditModalOpen(true)}
          onChangePasswordClick={() => setIsChangePasswordModalOpen(true)}
          />

        {/* --- 2. Información de Contacto --- */}
        <UserContactInfo 
          email={dummyUser.email} 
          phone={dummyUser.phone} 
          />

        {/* --- 3. Estadísticas de Donación --- */}
        <UserDonationStats 
          total={dummyStats.total} 
          pending={dummyStats.pending} 
          approved={dummyStats.approved} 
          />

        {/* --- 4. Historial Reciente --- */}
        <UserDonationHistory />

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
          currentUser={currentUser}
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
