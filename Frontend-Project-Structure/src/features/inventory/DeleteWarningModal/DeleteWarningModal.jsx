import React, { useState } from 'react';
import './DeleteWarningModal.css';
import Button from '../../../components/ui/Button/Button';

const DeleteWarningModal = ({ medication, onConfirm, onCancel }) => {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    await onConfirm();
    setLoading(false);
  };

  return (
    <div className="delete-warning-content">
      <p className="delete-warning-text">
        ¿Estás seguro de que quieres eliminar el medicamento 
        <strong> {medication?.name} ({medication?.dosage})</strong>?
        <br />
        Esta acción no se puede deshacer.
      </p>
      
      {/* TODO: Mostrar un 'error' si el 'await onConfirm()' falla */}

      <div className="delete-warning-actions">
        <Button 
          type="button" 
          variant="secondary" 
          onClick={onCancel}
          disabled={loading}
        >
          Cancelar
        </Button>
        <Button 
          type="button" 
          variant="primary" 
          // Estilo de peligro (rojo)
          style={{ backgroundColor: '#e74c3c' }}
          onClick={handleConfirm}
          disabled={loading}
        >
          {loading ? 'Eliminando...' : 'Sí, eliminar'}
        </Button>
      </div>
    </div>
  );
};

export default DeleteWarningModal;