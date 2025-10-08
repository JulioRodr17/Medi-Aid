import React from 'react';
import RegisterForm from '../../features/RegisterForm/RegisterForm';
import './RegisterPage.css';

const RegisterPage = () => {
  return (
    <div className="register-page-container">
      {/* Dentro de este contenedor, colocamos nuestro componente de formulario de registro */}
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
