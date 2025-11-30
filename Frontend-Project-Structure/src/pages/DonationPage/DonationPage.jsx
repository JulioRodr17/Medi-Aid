import React, { useState,useEffect } from 'react';
import './DonationPage.css';

import { donationService } from '../../services/donationService';
import { useAuth } from '../../context/AuthContext.jsx';

import TabToggle from '../../components/ui/TabToggle/TabToggle';
import DonationForm from '../../features/donation/DonationForm/DonationForm';
import DonationStatusTable from '../../features/donation/DonationStatusTable/DonationStatusTable';
import DonationReviewTable from '../../features/donation/DonationReviewTable/DonationReviewTable';
import Spinner from '../../components/ui/Spinner/Spinner';

const UserView = () => {
  const [activeTab, setActiveTab] = useState('option1'); // 'option1' = Realizar

  return (
    <>
      <div className="donation-toggle-wrapper">
        <TabToggle
          option1="Realizar Donación"
          option2="Estado de Donación"
          activeOption={activeTab}
          onToggle={setActiveTab} 
        />
      </div>

      <div className="donation-content">
        {activeTab === 'option1' && (
          <DonationForm />
        )}
        {activeTab === 'option2' && (
          <DonationStatusTable />
        )}
      </div>
    </>
  );
};

// La vista del Admin es más simple, solo muestra la tabla de revisión
const AdminView = () => {
  return (
    <div className="donation-content">
      <DonationReviewTable />
    </div>
  );
};


// --- El Componente Principal de la Página ---
const DonationPage = () => {
  // 3. Obtenemos el rol del usuario desde el contexto
  const { user } = useAuth();
  
  // Guardia de seguridad mientras carga el usuario
  if (!user) {
    return <Spinner label="Cargando vista..." />;
  }

  // 4. Renderizado Condicional: 
  // Mostramos una vista u otra basándonos en el rol.
  return (
    <div className="donation-page">
      {user.role === 'admin' ? <AdminView /> : <UserView />}
    </div>
  );
};

export default DonationPage;
