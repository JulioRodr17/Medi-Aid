import React, { useState } from "react"; 
import "./DonationReviewModal.css";
import { donationService } from "../../../services/donationService";
import { medicationService } from '../../../services/medicationService';
import StatusIcon from "../../../components/ui/StatusIcon/StatusIcon";
import Button from "../../../components/ui/button/Button";
import Modal from "../../../components/ui/Modal/Modal";
import MedicationForm from "../../../features/inventory/MedicationForm/MedicationForm";

import { useAuth } from "../../../context/AuthContext";

const DonationReviewModal = ({ donation, onClose }) => {
  const [showRejectReason, setShowRejectReason] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { user } = useAuth();

  // Estados para modal de medicamento
  const [isMedicationModalOpen, setIsMedicationModalOpen] = useState(false);
  const [medicationData, setMedicationData] = useState(null);

  if (!donation) return null;

  const { donacion, medicamento, cantidadOfrecida } = donation;

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("es-MX", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    });
  };


  // -------------------- FUNCIONES --------------------

  // Rechazar donación
  const handleReject = async () => {
    if (!rejectReason.trim()) {
      setError("Debe ingresar un motivo de rechazo.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const payload = {
        estadoDonacion: 'RECHAZADA',
        idDetalleDonacion: donacion.id,
        idUsuarioAprueba: user.id,
        motivoRechazo: rejectReason,
      };
      await donationService.rejectDonation(payload);

      onClose(true);
    } catch (err) {
      setError(err.message || "Error al procesar el rechazo.");
    } finally {
      setLoading(false);
    }
  };

  // Abrir modal de medicamento antes de aprobar
  const handleApprove = () => {
    setMedicationData(medicamento);
    setIsMedicationModalOpen(true);
  };

  // Guardar medicamento y aprobar donación
  const handleSaveMedication = async (updatedMedication) => {
    setLoading(true);
    setError(null);

    
    try {
      await medicationService.updateMedication(updatedMedication);

      const payload = {
        estadoDonacion: 'APROBADA',
        idDetalleDonacion: donacion.id,
        idUsuarioAprueba: user.id,
        idMedicamento: donation.medicamento.id
      };

      await donationService.approveDonation(payload);

      setIsMedicationModalOpen(false);
      onClose(true);
    } catch (err) {
      setError(err.message || "Error al aprobar la donación.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal isOpen={!!donation} onClose={() => onClose(false)} title="Revisar Donación">
        <div className="donation-detail-grid">
          <div className="detail-item full">
            <span className="label">Solicitante</span>
            <span className="value">
              {donacion.usuarioDonante.nombre} {donacion.usuarioDonante.apellidoPaterno}
            </span>
          </div>

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
            <span className="value">{medicamento.presentacion || "-"}</span>
          </div>

          <div className="detail-item">
            <span className="label">Dosis</span>
            <span className="value">{medicamento.dosis || "-"}</span>
          </div>

          <div className="detail-item">
            <span className="label">Lote</span>
            <span className="value">{donation.lote || "-"}</span>
          </div>

          <div className="detail-item">
            <span className="label">Fecha de caducidad</span>
            <span className="value">{donation.fechaCaducidadLote ? formatDate(donation.fechaCaducidadLote) : "-"}</span>
          </div>

          <div className="detail-item">
            <span className="label">Fecha de registro</span>
            <span className="value">{formatDate(donacion.fechaRegistro)}</span>
          </div>

          <div className="detail-item">
            <span className="label">Fecha de resolución</span>
            <span className="value">{donacion.fechaResolucion ? formatDate(donacion.fechaResolucion) : "Pendiente"}</span>
          </div>

          <div className="detail-item full">
            <span className="label">Estado</span>
            <br />
            <span className={`status-badge ${donacion.estadoDonacion.nombreEstado.toLowerCase()}`}>
              <StatusIcon status={donacion.estadoDonacion.nombreEstado} /> {donacion.estadoDonacion.nombreEstado}
            </span>
          </div>

          {error && <p className="review-modal-error">{error}</p>}

          {showRejectReason && (
            <div className="detail-item full">
              <span className="label">Motivo de rechazo</span>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Ingrese el motivo del rechazo..."
                rows={3}
              />
            </div>
          )}

          <div className="review-modal-actions">
            <Button
              variant="secondary"
              onClick={() => {
                if (!showRejectReason) {
                  setShowRejectReason(true);
                } else {
                  handleReject();
                }
              }}
              disabled={loading}
              style={{ borderColor: "#dc3545", color: "#dc3545" }}
            >
              {loading ? "..." : "Rechazar"}
            </Button>

            <Button
              variant="primary"
              onClick={handleApprove}
              disabled={loading}
              style={{ backgroundColor: "#28a745" }}
            >
              {loading ? "..." : "Aprobar"}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Modal de edición de medicamento */}
      {isMedicationModalOpen && (
        <Modal
          isOpen={isMedicationModalOpen}
          onClose={() => setIsMedicationModalOpen(false)}
          title="Editar Medicamento antes de aprobar"
        >
          <MedicationForm
            medication={medicationData}
            onSave={handleSaveMedication}
            onCancel={() => setIsMedicationModalOpen(false)}
          />
        </Modal>
      )}
    </>
  );
};

export default DonationReviewModal;
