import React, { useState } from 'react';

// Importamos nuestros componentes de UI reutilizables
import Input from '../../components/ui/input/Input';
import Button from '../../components/ui/button/Button';
import BackButton from '../../components/ui/backbutton/BackButton';

import {useNavigate} from 'react-router-dom';
import { authService } from '../../services/authService'; // Importamos el servicio
// TODO: Necesitamos 'useSearchParams' para leer el token de la URL
// import { useSearchParams } from 'react-router-dom';

import './ResetPasswordForm.css';

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const token = 'dummy_token'; // Usamos un token dummy por ahora

  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (error) {
      setError('');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (formData.newPassword !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await authService.resetPassword(token, formData.newPassword);
      setSuccess(true);
      // Damos 3 segundos antes de redirigir al login
      setTimeout(() => {
        navigate('/login');
      }, 3000);

    } catch (err) {
      setError(err.message || 'Error al restablecer la contraseña.');
    } finally {
      setLoading(false);
    }
  };
  
  // Si 'success' es true, mostramos mensaje de éxito
  if (success) {
    return (
      <div className="reset-password-form-box">
        <h2>¡Contraseña Cambiada!</h2>
        <p className="form-instructions">
          Tu contraseña ha sido actualizada con éxito. Serás redirigido al login...
        </p>
      </div>
    );
  }

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="reset-password-form-box">
      <BackButton onClick={() => navigate('/login')} />
      <h2>Crear Nueva Contraseña</h2>
      <p className="form-instructions">
        Tu nueva contraseña debe ser segura y fácil de recordar.
      </p>
      <form onSubmit={handleSubmit} className="reset-password-form">
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
        
        <Button 
          type="submit" 
          variant="primary"
          style={{ backgroundColor: '#3921f2' }}
          disabled={loading}
        >
          {loading ? 'Guardando...' : 'Guardar Contraseña'}
        </Button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
