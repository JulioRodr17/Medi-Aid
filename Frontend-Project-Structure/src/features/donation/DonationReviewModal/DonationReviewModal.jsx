import React, { useState } from 'react';
import './DonationReviewModal.css';
import { donationService } from '../../../services/donationService';
import Button from '../../../components/ui/button/Button';

const DonationReviewModal = ({ donation, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Función para manejar la aprobación o rechazo
  const handleAction = async (action) => {
    setLoading(true);
    setError(null);

    try {
      if (action === 'approve') {
        // TODO: BACKEND - Llamada al servicio para aprobar
        await donationService.approveDonation(donation.id);
      } else if (action === 'reject') {
        // TODO: BACKEND - Llamada al servicio para rechazar
        await donationService.rejectDonation(donation.id);
      }
      
      onClose(true); // Cierra el modal y refresca la lista (pasando true)

    } catch (err) {
      setError(err.message || 'Error al procesar la solicitud.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="review-modal-content">
      <h3 className="review-modal-subtitle">
        Solicitud de: <strong>{donation.userName}</strong>
      </h3>
      
      <div className="review-details">
        <div className="review-detail-item">
          <span className="detail-label">Medicamento:</span>
          <span className="detail-value">{donation.name}</span>
        </div>
        <div className="review-detail-item">
          <span className="detail-label">Tipo:</span>
          <span className="detail-value">{donation.tipo}</span>
        </div>
        {donation.concentracion && (
          <div className="review-detail-item">
            <span className="detail-label">Concentración:</span>
            <span className="detail-value">{donation.concentracion}</span>
          </div>
        )}
        <div className="review-detail-item">
          <span className="detail-label">Cantidad:</span>
          <span className="detail-value">{`${donation.cantidadNumerica} ${donation.cantidadDonada}`}</span>
        </div>
        <div className="review-detail-item">
          <span className="detail-label">Lote:</span>
          <span className="detail-value">{donation.lote || 'N/A'}</span>
        </div>
        <div className="review-detail-item">
          <span className="detail-label">Caducidad:</span>
          <span className="detail-value">{donation.caducidad || 'N/A'}</span>
        </div>
      </div>

      {error && (
        <p className="review-modal-error">{error}</p>
      )}

      <div className="review-modal-actions">
        <Button 
          variant="secondary"
          onClick={() => handleAction('reject')}
          disabled={loading}
          style={{ borderColor: '#dc3545', color: '#dc3545' }} // Estilo "Rechazar"
        >
          {loading ? '...' : 'Rechazar'}
        </Button>
        <Button 
          variant="primary"
          onClick={() => handleAction('approve')}
          disabled={loading}
          style={{ backgroundColor: '#28a745' }} // Estilo "Aprobar"
        >
          {loading ? '...' : 'Aprobar'}
        </Button>
      </div>
    </div>
  );
};

export default DonationReviewModal;