import React, { useState } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";

// Importamos nuestros componentes de UI reutilizables
import Input from '../../components/ui/input/Input';
import Button from '../../components/ui/button/Button';
import BackButton from '../../components/ui/backbutton/BackButton';

import { authService } from '../../services/authService'; // Importamos el servicio
// TODO: Necesitamos 'useSearchParams' para leer el token de la URL
// import { useSearchParams } from 'react-router-dom';

import './ResetPasswordForm.css';

const ResetPasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
  });


  const navigate = useNavigate();
  const token = searchParams.get("token");

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
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    
    if (formData.newPassword !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    // Validar seguridad de contraseña
    if (!passwordRegex.test(formData.newPassword)) {
      setError(
        'La contraseña debe tener mínimo 8 caracteres, incluir mayúscula, minúscula, número y un carácter especial.'
      );
      return;
    }
    
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await authService.resetPassword(token, formData.newPassword);
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);

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
    navigate('/login');
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
