import React, { useState } from 'react';

// Importamos nuestros componentes de UI reutilizables
import Input from '../../components/ui/input/Input';
import Button from '../../components/ui/button/Button';
import BackButton from '../../components/ui/backbutton/BackButton';

import {useNavigate} from 'react-router-dom';

import './ForgotPasswordForm.css';

const ForgotPasswordForm = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí, en el futuro, haríamos la llamada al backend para enviar el correo
    console.log('Enviando correo de recuperación a:', email);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="forgot-password-form-box">
      <BackButton onClick={handleBack} />
      <h2>Restablecer Contraseña</h2>
      <p className="form-instructions">
        Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
      </p>
      <form onSubmit={handleSubmit} className="forgot-password-form">
        <Input
          id="email"
          label="Correo Institucional"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu.correo@ejemplo.com"
          required
        />
        <Button type="submit" variant="primary">
          Enviar Correo
        </Button>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
