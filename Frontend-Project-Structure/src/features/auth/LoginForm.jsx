import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginForm.css';

import Input from '../../components/ui/input/Input';
import Button from '../../components/ui/button/Button';
import logo from '../../assets/images/logoMediAid.jpeg';


const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // 2. Inicializamos el hook de navegación
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Enviando datos:', { email, password });
    
    // TODO: BACKEND
    // Aquí iría tu lógica de fetch/axios para validar al usuario.
    // Si la validación es exitosa...
    
    // 3. ¡Navegamos al usuario a la página principal!
    navigate('/'); // Esto te lleva a la HomePage
  };

  return (
    <div className="login-form-box">
      <img src={logo} alt="Logo de Medi-Aid" className="login-logo" />
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <Input
          id="email"
          label="Correo Electrónico"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          id="password"
          label="Contraseña"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        <Button 
          type="submit" 
          variant="primary" 
        >
          Ingresar
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
