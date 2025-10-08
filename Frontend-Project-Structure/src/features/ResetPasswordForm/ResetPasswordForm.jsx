import React, { useState } from 'react';

// Importamos nuestros componentes de UI reutilizables
import Input from '../../components/ui/input/Input';
import Button from '../../components/ui/button/Button';
import BackButton from '../../components/ui/backbutton/BackButton';

import {useNavigate} from 'react-router-dom';


import './ResetPasswordForm.css';

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      // En una app real, mostraríamos un mensaje de error más elegante
      alert('Las contraseñas no coinciden.');
      return;
    }
    // Aquí haríamos la llamada al backend para actualizar la contraseña
    console.log('Nueva contraseña establecida:', password);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="reset-password-form-box">
      <BackButton onClick={handleBack} />
      <h2>Crear Nueva Contraseña</h2>
      <p className="form-instructions">
        Tu nueva contraseña debe ser segura y fácil de recordar.
      </p>
      <form onSubmit={handleSubmit} className="reset-password-form">
        <Input
          id="newPassword"
          label="Nueva Contraseña"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
        />
        <Input
          id="confirmPassword"
          label="Confirmar Nueva Contraseña"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="••••••••"
          required
        />
        <Button type="submit" variant="primary">
          Guardar Contraseña
        </Button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
