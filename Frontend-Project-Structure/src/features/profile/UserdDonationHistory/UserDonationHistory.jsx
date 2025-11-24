import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UserDonationHistory.css';
import StatusIcon from '../../../components/ui/StatusIcon/StatusIcon';
import Button from '../../../components/ui/button/Button';
import '../UserContactInfo/UserContactInfo.css';

import { useAuth } from '../../../context/AuthContext.jsx';

const UserDonationHistory = ({ history }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const goToDonations = () => {
    const prefix = user?.role === 'admin' ? '/admin' : '/user';
    navigate(`${prefix}/donacion`);
  };

  if (!history) {
     return (
      <div className="profile-card">
        <h3 className="profile-card-title">Historial Reciente</h3>
        <p className="history-empty-message">Cargando historial...</p>
      </div>
    );
  }

  return (
    <div className="profile-card">
      <h3 className="profile-card-title">Historial Reciente</h3>
      
      {/* Verificamos si hay historial */}
      {history && history.length > 0 ? (
        <>
          <table className="history-table">
            <thead>
              <tr>
                <th>Medicamento</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {history.map(don => (
                <tr key={don.id}>
                  <td>{don.name}</td>
                  <td>
                    {/* Ponemos el ícono de estado aquí */}
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
        </>
      ) : (
        // Mensaje si no hay historial
        <p className="history-empty-message">Aún no tienes donaciones en tu historial.</p>
      )}
    </div>
  );
};

export default UserDonationHistory;
