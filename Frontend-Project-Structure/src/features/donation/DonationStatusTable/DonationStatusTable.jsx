import React from 'react';
import './DonationStatusTable.css';
import StatusIcon from '../../../components/ui/StatusIcon/StatusIcon';

// --- Datos Dummy ---
const dummyDonations = [
  { id: 1, name: 'Paracetamol', quantity: '2 cajas', status: 'aprobado' },
  { id: 2, name: 'Amoxicilina', quantity: '1 envase', status: 'pendiente' },
  { id: 3, name: 'Gasas Estériles', quantity: '5 insumos', status: 'rechazado' },
  { id: 4, name: 'Ibuprofeno', quantity: '1 caja', status: 'pendiente' },
];

const DonationStatusTable = () => {
  return (
    <div className="status-table-container">
      <table>
        <thead>
          <tr>
            <th>Medicamento</th>
            <th>Cantidad Donada</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {dummyDonations.map(donation => (
            <tr key={donation.id}>
              <td data-label="Medicamento">{donation.name}</td>
              <td data-label="Cantidad Donada">{donation.quantity}</td>
              <td data-label="Estado">
                <div className="status-cell">
                  <StatusIcon status={donation.status} />
                  {/* Capitalizamos la primera letra del estado */}
                  <span>{donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DonationStatusTable;
