import React, { useState,useEffect } from 'react';
import './DonationPage.css';

import { donationService } from '../../services/donationService';
import { useAuth } from '../../context/AuthContext.jsx';

import TabToggle from '../../components/ui/TabToggle/TabToggle';
import DonationForm from '../../features/donation/DonationForm/DonationForm';
import DonationStatusTable from '../../features/donation/DonationStatusTable/DonationStatusTable';

const DonationPage = () => {
  const [activeTab, setActiveTab] = useState('option1'); // 'option1' = Realizar

  // --- Estados para el historial de donaciones ---
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(false); // Empezamos en false, solo cargamos si se necesita
  const [error, setError] = useState(null);

  // TODO: BACKEND - Traer el 'user' desde 'useAuth()'
  // const { user } = useAuth();

  useEffect(() => {
    // Solo cargamos los datos si estamos en la pestaña "Estado de Donación"
    if (activeTab === 'option2') {
      const loadDonationHistory = async () => {
        try {
          setLoading(true);
          setError(null);

          // TODO: BACKEND - Cuando tengamos el 'user', aquí pasaremos el 'user.id'
          // const historyData = await donationService.getDonationHistory(user.id);
          
          // Por ahora, usamos el servicio que nos da los datos dummy
          const historyData = await donationService.getDonationHistory();
          
          setDonations(historyData);
          
        } catch (err) {
          console.error("Error al cargar historial de donaciones:", err);
          setError(err.message || 'No se pudo cargar el historial.');
        } finally {
          setLoading(false);
        }
      };

      loadDonationHistory();
    }
  }, [activeTab]);


  return (
    <div className="donation-page">
      <div className="donation-toggle-wrapper">
        <TabToggle
          option1="Realizar Donación"
          option2="Estado de Donación"
          activeOption={activeTab}
          onToggle={setActiveTab} // onToggle actualiza el estado 'activeTab'
        />
      </div>

      {/* --- Contenido Condicional --- */}
      <div className="donation-content">
        {activeTab === 'option1' && (
          <DonationForm />
        )}
        
        {/* Si la pestaña activa es la 'option2', mostramos la tabla o los estados de carga */}
        {activeTab === 'option2' && (
          <>
            {loading && <div className="page-loading">Cargando historial...</div>}
            
            {error && <div className="page-error">Error: {error}</div>}
            
            {!loading && !error && (
              <DonationStatusTable donations={donations} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DonationPage;
