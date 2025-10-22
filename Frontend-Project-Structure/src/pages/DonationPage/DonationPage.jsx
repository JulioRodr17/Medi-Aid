import React, { useState } from 'react';
import './DonationPage.css';
import TabToggle from '../../components/ui/TabToggle/TabToggle';
import DonationForm from '../../features/donation/DonationForm/DonationForm';
import DonationStatusTable from '../../features/donation/DonationStatusTable/DonationStatusTable';

const DonationPage = () => {
  const [activeTab, setActiveTab] = useState('option1'); // 'option1' = Realizar

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
        {activeTab === 'option2' && (
          <DonationStatusTable />
        )}
      </div>
    </div>
  );
};

export default DonationPage;
