import React, { useState } from 'react';
import './LoginForm.css';
import logo from '../../../src/assets/images/logoMediAid.jpeg';

// Este es nuestro componente "experto". Se encarga de toda la lógica
// y la estructura interna de un formulario de inicio de sesión.
const LoginForm = () => {
  // Estados para guardar lo que el usuario escribe en los campos
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Esta función se ejecuta cuando el usuario envía el formulario
  const handleSubmit = (event) => {
    event.preventDefault(); // Evita que la página se recargue
    console.log('Intentando iniciar sesión con:', { email, password });
    // Aquí, en el futuro, haríamos la llamada al backend
  };

  return (
    <div className="login-form-box">
      <h2>Iniciar Sesión</h2>

      <img src={logo} alt="Logo de Medi-Aid" className="login-logo" />
      
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="tu.correo@ejemplo.com"
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
          />
        </div>
        
        <button type="submit" className="login-button">
          Ingresar
        </button>
        <button type="submit" className="login-button" href="/register">
          Registrarse
        </button>
      </form>
      
      <div className="login-links">
        <a href="/recuperar-contrasena">¿Olvidaste tu contraseña?</a>
      </div>
    </div>
  );
};

export default LoginForm;

