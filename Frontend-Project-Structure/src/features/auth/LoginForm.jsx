import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginForm.css';
import logo from '../../../src/assets/images/logoMediAid.jpeg';

import Button from '../../components/ui/button/Button'
import Input from '../../components/ui/input/Input'

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
   {/* Validacion*/}
    event.preventDefault(); 
    console.log('Intentando iniciar sesión con:', { email, password });
  };

  return (
    <div className="login-form-box">
      <h2>Iniciar Sesión</h2>

      <img src={logo} alt="Logo de Medi-Aid" className="login-logo" />
      
      <form onSubmit={handleSubmit}>
        <Input
          id="email"
          label="Correo Electrónico"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu.correo@ejemplo.com"
        />

        <Input
          id="password"
          label="Contraseña"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />

        <Button type="submit" className="login-button">
          <Link to="/HomePage">Iniciar Sesión</Link>
        </Button>
      </form>
      
      <div className="login-links">
        <Link to="/recuperar-contrasena">¿Olvidaste tu contraseña?</Link>
        <Link to="/registro">¿No tienes cuenta? Regístrate</Link>
      </div>
    </div>
  );
};

export default LoginForm;

