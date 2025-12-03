import React, { useState, useEffect } from 'react';
import './DonationReviewTable.css';
import { donationService } from '../../../services/donationService';
import StatusIcon from '../../../components/ui/StatusIcon/StatusIcon';
import Button from '../../../components/ui/button/Button';
import Spinner from '../../../components/ui/Spinner/Spinner';
import EmptyState from '../../../components/ui/EmptyState/EmptyState';

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
      
      if (Array.isArray(data)) {
      data.forEach(item => {
        if (item.medicamento) {
          item.medicamento.cantidadStock = item.cantidadOfrecida;
        }
      });
    }
      
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
    return <Spinner label="Cargando revisiones..." />;
  }

  if (error) {
    return <div className="review-error">Error: {error}</div>;
  }

return (
  <>
    <div className="review-table-container">
      <h2 className="review-title">Revisión de Donaciones Pendientes</h2>

      {(!Array.isArray(pendingDonations) || pendingDonations.length === 0) ? (
        <EmptyState
          icon="✅"
          title="No hay donaciones pendientes"
          message="Las nuevas donaciones aparecerán aquí para su revisión."
        />
      ) : (
        <div className="review-table-scroll">
          <table className="review-table">
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Medicamento</th>
                <th>Cantidad</th>
                <th>Caducidad</th>
              </tr>
            </thead>
            <tbody>
              {pendingDonations.map((donation) => (
                <tr
                  key={donation.id}
                  className="review-row"
                  onClick={() => setSelectedDonation(donation)}
                >
                  <td>
                    {donation.donacion.usuarioDonante.nombre}{" "}
                    {donation.donacion.usuarioDonante.apellidoPaterno}{" "}
                    {donation.donacion.usuarioDonante.apellidoMaterno}
                  </td>
                  <td>{donation.medicamento.nombreMedicamento}</td>
                  <td>{`${donation.cantidadOfrecida}`}</td>
                  <td>{donation.fechaCaducidadLote || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>

    {selectedDonation && (
      <DonationReviewModal
        donation={selectedDonation}
        onClose={handleCloseModal}
      />
    )}
  </>
);

};

export default DonationReviewTable;