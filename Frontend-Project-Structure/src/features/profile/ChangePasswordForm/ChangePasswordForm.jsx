import React, { useState } from 'react';
import './ChangePasswordForm.css';
import Input from '../../../components/ui/input/Input';
import Button from '../../../components/ui/button/Button';
import { profileService } from '../../../services/profileService.js'; // Importamos el servicio
import { useAuth } from '../../../context/AuthContext.jsx';

const ChangePasswordForm = ({ onSave, onCancel }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Limpia el error en cuanto el usuario empieza a corregir
    if (error) {
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Validación: Revisamos que las contraseñas nuevas coincidan
    if (formData.newPassword !== formData.confirmPassword) {
      setError('Las nuevas contraseñas no coinciden.');
      return; // Detenemos el envío
    }
    
    // 2. Validación: (Opcional) Revisar longitud de contraseña
    if (formData.newPassword.length < 8) {
      setError('La nueva contraseña debe tener al menos 8 caracteres.');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      // Llamamos al servicio
      await profileService.changePassword(user.id, formData);
      onSave(); // Cerramos el modal

    } catch (err) {
      // El error de "contraseña actual incorrecta" vendrá del servicio
      setError(err.message || 'Error al cambiar la contraseña.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="change-password-form">
      <Input
        id="currentPassword"
        name="currentPassword"
        label="Contraseña Actual"
        type="password"
        value={formData.currentPassword}
        onChange={handleChange}
        disabled={loading}
        required
      />
      <Input
        id="newPassword"
        name="newPassword"
        label="Nueva Contraseña"
        type="password"
        value={formData.newPassword}
        onChange={handleChange}
        disabled={loading}
        required
      />
      <Input
        id="confirmPassword"
        name="confirmPassword"
        label="Confirmar Nueva Contraseña"
        type="password"
        value={formData.confirmPassword}
        onChange={handleChange}
        disabled={loading}
        required
      />
      
      {error && <p className="form-error-message">{error}</p>}

      <div className="form-actions">
        <Button type="button" variant="secondary" onClick={onCancel} disabled={loading}>
          Cancelar
        </Button>
        <Button 
          type="submit" 
          variant="primary" 
          style={{ backgroundColor: '#3921f2' }}
          disabled={loading}
        >
          {loading ? 'Guardando...' : 'Guardar Contraseña'}
        </Button>
      </div>
    </form>
  );
};

export default ChangePasswordForm;