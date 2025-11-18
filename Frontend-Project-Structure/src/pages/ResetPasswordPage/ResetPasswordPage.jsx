import React from 'react';
import ResetPasswordForm from '../../features/ResetPasswordForm/ResetPasswordForm';
import './ResetPasswordPage.css';

// La página contenedora, consistente con las demás
const ResetPasswordPage = () => {
  return (
    <div className="reset-password-page-container">
      <ResetPasswordForm />
    </div>
  );
};

export default ResetPasswordPage;
