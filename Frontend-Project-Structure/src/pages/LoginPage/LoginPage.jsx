import React from 'react';
import LoginForm from '../../features/auth/LoginForm';
import './LoginPage.css';

const LoginPage = () => {
  return (
    <div className="login-page-container">
      {/* Dentro de este contenedor, colocamos nuestro componente de formulario */}
      <LoginForm />
    </div>
  );
};

export default LoginPage;

