import React from 'react';
import Modal from '../../../components/ui/Modal/Modal'; // tu Modal genérico
import StatusIcon from '../../../components/ui/StatusIcon/StatusIcon';
import './DonationDetailModal.css';

const DonationDetailModal = ({ donation, onClose }) => {
  if (!donation) return null;

  const { donacion, medicamento, cantidadOfrecida } = donation;
  console.log(donation);
  function formatDate(dateString) {
    if (!dateString) return "-";

    // Parseo manual de YYYY-MM-DD
    const [y, m, d] = dateString.split("-");
    const date = new Date(Number(y), Number(m) - 1, Number(d));
    date.setHours(0, 0, 0, 0);

    return date.toLocaleDateString();
  }


  return (
    <Modal isOpen={true} onClose={onClose} title="Detalle de la donación">
      <div className="donation-detail-grid">
        <div className="detail-item">
          <span className="label">Medicamento</span>
          <span className="value">{medicamento.nombreMedicamento}</span>
        </div>

        <div className="detail-item">
          <span className="label">Cantidad ofrecida</span>
          <span className="value">{cantidadOfrecida}</span>
        </div>

        <div className="detail-item">
          <span className="label">Presentación</span>
          <span className="value">{medicamento.presentacion || '-'}</span>
        </div>

        <div className="detail-item">
          <span className="label">Dosis</span>
          <span className="value">{medicamento.dosis || '-'}</span>
        </div>

        <div className="detail-item">
          <span className="label">Lote</span>
          <span className="value">{donation.lote || '-'}</span>
        </div>

        <div className="detail-item">
          <span className="label">Fecha de caducidad</span>
          <span className="value">
            {donation.fechaCaducidadLote
              ? formatDate(donation.fechaCaducidadLote)
              : '-'}
          </span>
        </div>

        <div className="detail-item">
          <span className="label">Fecha de registro</span>
          <span className="value">{formatDate(donacion.fechaRegistro)}</span>
        </div>

        <div className="detail-item">
          <span className="label">Fecha de resolución</span>
          <span className="value">
            {donacion.fechaResolucion
              ? formatDate(donacion.fechaResolucion)
              : 'Pendiente'}
          </span>
        </div>

        {donation.donacion.estadoDonacion.nombreEstado === "RECHAZADA" && (
          <div className="rejection-observations">
            <span className="label">Observaciones:</span><br></br>
            <span className="value">{donation.donacion.motivoRechazo || '-'}</span>
          </div>
        )}


        <div className="detail-item full">
          <span className="label">Estado</span><br></br>
          <span
            className={`status-badge ${donacion.estadoDonacion.nombreEstado.toLowerCase()}`}
          >
            <StatusIcon status={donacion.estadoDonacion.nombreEstado} />{' '}
            {donacion.estadoDonacion.nombreEstado}
          </span>
        </div>
      </div>
    </Modal>
  );
};

export default DonationDetailModal;
