import React, { useState } from "react";

// Importamos nuestros componentes de UI reutilizables
import Input from "../../components/ui/input/Input";
import Button from "../../components/ui/button/Button";
import BackButton from "../../components/ui/backbutton/BackButton";

import { useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";

import "./ForgotPasswordForm.css";

const ForgotPasswordForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false); // Estado para mensaje de éxito

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await authService.forgotPassword(email);
      setSuccess(true); // Mostramos el mensaje de éxito
    } catch (err) {
      setError(err.message || "Error al enviar el correo.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="forgot-password-form-box">
        <BackButton onClick={() => navigate("/login")} />
        <h2>Revisa tu Correo</h2>
        <p className="form-instructions">
          Si tu correo está registrado, recibirás un enlace para restablecer tu
          contraseña en unos minutos.
        </p>
      </div>
    );
  }

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="forgot-password-form-box">
      <BackButton onClick={() => navigate(-1)} />
      <h2>Restablecer Contraseña</h2>
      <p className="form-instructions">
        Ingresa tu correo electrónico y te enviaremos un enlace para restablecer
        tu contraseña.
      </p>
      <form onSubmit={handleSubmit} className="forgot-password-form">
        <Input
          id="email"
          label="Correo Institucional"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          required
        />

        {error && <p className="form-error-message">{error}</p>}

        <Button
          type="submit"
          variant="primary"
          style={{ backgroundColor: "#3921f2" }}
          disabled={loading}
        >
          {loading ? "Enviando..." : "Enviar Correo"}
        </Button>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
