import React, { useState, useEffect } from 'react';
import './DonationReviewTable.css';
import { donationService } from '../../../services/donationService';
import StatusIcon from '../../../components/ui/StatusIcon/StatusIcon';
import Button from '../../../components/ui/button/Button';

import DonationReviewModal from '../DonationReviewModal/DonationReviewModal';
import Modal from '../../../components/ui/Modal/Modal'; 

const DonationReviewTable = () => {
  const [pendingDonations, setPendingDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedDonation, setSelectedDonation] = useState(null);

  const fetchPendingDonations = async () => {
    try {
      setLoading(true);
      setError(null);
      // TODO: BACKEND - Llamada al servicio para obtener donaciones pendientes
      const data = await donationService.getPendingDonations();
      setPendingDonations(data);
    } catch (err) {
      setError(err.message || 'Error al cargar las donaciones pendientes.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingDonations();
  }, []);

  const handleCloseModal = (refresh = false) => {
    setSelectedDonation(null);
    if (refresh) {
      fetchPendingDonations(); 
    }
  };

  if (loading) {
    return <div className="review-loading">Cargando revisiones...</div>;
  }

  if (error) {
    return <div className="review-error">Error: {error}</div>;
  }

  return (
    <>
      <div className="review-table-container">
        <h2 className="review-title">Revisión de Donaciones Pendientes</h2>
        
        {pendingDonations.length === 0 ? (
          <p className="review-empty">¡Buen trabajo! No hay donaciones pendientes.</p>
        ) : (
          <table className="review-table">
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Medicamento</th>
                <th>Cantidad</th>
                <th>Caducidad</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pendingDonations.map((donation) => (
                <tr key={donation.id}>
                  <td>{donation.userName}</td>
                  <td>{donation.name}</td>
                  <td>{`${donation.cantidadNumerica} ${donation.cantidadDonada}`}</td>
                  <td>{donation.caducidad || 'N/A'}</td>
                  <td>
                    <Button 
                      variant="primary" 
                      onClick={() => setSelectedDonation(donation)}
                      style={{ backgroundColor: '#3921f2' }} // Tu color primario
                    >
                      Revisar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* --- El Modal --- */}
      <Modal
        title="Revisar Donación"
        isOpen={!!selectedDonation} // El modal está abierto si selectedDonation no es null
        onClose={() => handleCloseModal(false)}
      >
        {selectedDonation && (
          <DonationReviewModal 
            donation={selectedDonation}
            onClose={handleCloseModal} // Pasa la función de cierre al modal
          />
        )}
      </Modal>
    </>
  );
};

export default DonationReviewTable;