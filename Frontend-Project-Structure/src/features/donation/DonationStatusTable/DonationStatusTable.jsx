import React, { useState, useEffect } from 'react';
import './DonationStatusTable.css';
import StatusIcon from '../../../components/ui/StatusIcon/StatusIcon';
import { donationService } from '../../../services/donationService';
import { useAuth } from '../../../context/AuthContext.jsx';
import Spinner from '../../../components/ui/Spinner/Spinner';
import EmptyState from '../../../components/ui/EmptyState/EmptyState';
import DonationDetailModal from './DonationDetailModal'


const DonationStatusTable = () => {
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    // Si no hay usuario (aún cargando), no hacemos nada.
    if (!user) return;

    const loadDonationHistory = async () => {
      try {
        setLoading(true);
        setError(null);

        // TODO: BACKEND - Llamamos al servicio con el ID del usuario
        const data = await donationService.getDonationHistory(user.id);
        console.log(data);
        setDonations(data);

      } catch (err) {
        console.error("Error al cargar historial de donaciones:", err);
        setError(err.message || 'No se pudo cargar el historial.');
      } finally {
        setLoading(false);
      }
    };

    loadDonationHistory();
  }, [user]);

  const handleSelectDonation = (donation) => {
    setSelectedDonation(donation);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("es-MX", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    });
  };

  if (loading) {
    return <Spinner label="Cargando tu historial..." />;
  }

  if (error) {
    return <p className="status-table-empty status-table-error">Error: {error}</p>;
  }

  if (donations.length === 0) {
    return (
      <EmptyState
        icon="🎁"
        title="Sin donaciones registradas"
        message="Cuando dones un medicamento podrás consultar su estado aquí."
      />
    );
  }

  return (
    <div className="status-table-container">
      <table>
        <thead>
          <tr>
            <th>Fecha registro</th>
            <th>Medicamento</th>
            <th>Cantidad</th>
            <th>Estatus</th>
          </tr>
        </thead>
        <tbody>
          {donations.map((donation) => (
            <tr
              key={donation.id}
              onClick={() => handleSelectDonation(donation)}
              className="row-clickable"
            >
              <td>{formatDate(donation.donacion.fechaRegistro)}</td>
              <td>{donation.medicamento.nombreMedicamento}</td>
              <td>{donation.cantidadOfrecida}</td>
              <td className="status-cell">
                <StatusIcon
                  status={donation.donacion.estadoDonacion.nombreEstado}
                />
                <span className="status-text">
                  {donation.donacion.estadoDonacion.nombreEstado}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedDonation && (
        <DonationDetailModal
          donation={selectedDonation}
          onClose={() => setSelectedDonation(null)}
        />
      )}
    </div>
  );

};

export default DonationStatusTable;