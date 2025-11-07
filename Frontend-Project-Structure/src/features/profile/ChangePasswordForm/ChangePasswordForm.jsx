import React, { useState } from 'react';
import './ChangePasswordForm.css';
import Input from '../../../components/ui/input/Input';
import Button from '../../../components/ui/button/Button';

const ChangePasswordForm = ({ onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Estado para manejar errores de validación
  const [error, setError] = useState('');

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

  const handleSubmit = (e) => {
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

    // Si todo está bien, limpiamos errores y enviamos
    setError('');

    // TODO: BACKEND
    // Aquí se llamaría a la API para validar la contraseña actual
    // y guardar la nueva.
    console.log('Guardando nueva contraseña...');
    
    // Llamamos a la función onSave (que cerrará el modal)
    onSave(formData); 
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
        required
      />
      <Input
        id="newPassword"
        name="newPassword"
        label="Nueva Contraseña"
        type="password"
        value={formData.newPassword}
        onChange={handleChange}
        required
      />
      <Input
        id="confirmPassword"
        name="confirmPassword"
        label="Confirmar Nueva Contraseña"
        type="password"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
      />
      
      {/* Mostramos el mensaje de error si existe */}
      {error && <p className="form-error-message">{error}</p>}

      <div className="form-actions">
        <Button 
          type="button" 
          variant="secondary" 
          onClick={onCancel}
        >
          Cancelar
        </Button>
        <Button 
          type="submit" 
          variant="primary" 
          style={{ backgroundColor: '#3921f2' }} // Tu color primario
        >
          Guardar Contraseña
        </Button>
      </div>
    </form>
  );
};

export default ChangePasswordForm;