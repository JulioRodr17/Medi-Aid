import React, { useState, useEffect } from 'react';
import './DonationStatusTable.css';
import StatusIcon from '../../../components/ui/StatusIcon/StatusIcon';
import { donationService } from '../../../services/donationService';
import { useAuth } from '../../../context/AuthContext.jsx';



const DonationStatusTable = () => {
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

  if (loading) {
    return <p className="status-table-empty">Cargando tu historial...</p>;
  }

  if (error) {
    return <p className="status-table-empty status-table-error">Error: {error}</p>;
  }

  if (donations.length === 0) {
    return <p className="status-table-empty">Aún no has realizado ninguna donación.</p>;
  }

  return (
    <div className="status-table-container">
      <table>
        <thead>
          <tr>
            <th>Medicamento</th>
            <th>Cantidad</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {donations.map((donation) => (
            <tr key={donation.id}>
              <td>{donation.name}</td>
              <td>{`${donation.cantidadNumerica} ${donation.cantidadDonada}`}</td>
              <td className="status-cell">
                <StatusIcon status={donation.status} />
                <span className="status-text">{donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DonationStatusTable;
