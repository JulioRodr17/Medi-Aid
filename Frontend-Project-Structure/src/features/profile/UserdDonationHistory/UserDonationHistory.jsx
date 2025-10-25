import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UserDonationHistory.css';
import StatusIcon from '../../../components/ui/StatusIcon/StatusIcon';
import Button from '../../../components/ui/button/Button';

// TODO: BACKEND
// Estos datos vendrán de la API (ej. /api/donations?limit=3)
const dummyRecentDonations = [
  { id: 1, name: 'Paracetamol', status: 'aprobado' },
  { id: 2, name: 'Jeringas (Caja)', status: 'pendiente' },
  { id: 3, name: 'Amoxicilina', status: 'rechazado' },
];

const UserDonationHistory = () => {
  const navigate = useNavigate();

  const goToDonations = () => {
    // Te lleva a la página de donación y (en un futuro)
    // podríamos pasar estado para que abra la pestaña correcta.
    navigate('/donacion');
  };

  return (
    <div className="profile-card">
      <h3 className="profile-card-title">Historial Reciente</h3>
      <table className="history-table">
        <thead>
          <tr>
            <th>Medicamento</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {dummyRecentDonations.map(don => (
            <tr key={don.id}>
              <td>{don.name}</td>
              <td>
                <StatusIcon status={don.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="history-footer">
        <Button 
          variant="secondary" 
          onClick={goToDonations} 
          style={{ borderColor: '#3921f2', color: '#3921f2' }} // Tu color
        >
          Ver Historial Completo
        </Button>
      </div>
    </div>
  );
};

export default UserDonationHistory;
