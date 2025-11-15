import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx"; // Importamos useAuth
import { authService } from "../../services/authService";
import Input from "../../components/ui/input/Input";
import Button from "../../components/ui/button/Button";
import BackButton from "../../components/ui/backbutton/BackButton";

import "./RegisterForm.css";

const QrIcon = () => (
  <svg
    width="60"
    height="60"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 0H40V10H10V40H0V0ZM100 0H60V10H90V40H100V0ZM0 100H40V90H10V60H0V100ZM100 100H60V90H90V60H100V100ZM60 20H80V40H60V20ZM40 40H20V20H40V40ZM20 60H40V80H20V60ZM60 60H80V80H60V60ZM50 50H70V70H90V50H70V30H50V50Z"
      fill="#333"
    />
  </svg>
);

const RegisterForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    apellidoP: "",
    apellidoM: "",
    boleta: "",
    correo: "",
    password: "",
    confirmPassword: "",
    privacyAccepted: false,
  });

  const [isQrValidated, setIsQrValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const registerData = {
        name: `${formData.nombre} ${formData.apellidoP} ${formData.apellidoM}`,
        email: formData.correo,
        password: formData.password,
        boleta: formData.boleta,
      };
      await authService.register(registerData);

      await login(formData.correo, formData.password);

      navigate("/login");
    } catch (err) {
      setError(err.message || "Error al crear la cuenta.");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleQrClick = () => {
    // Aquí iría la lógica para abrir el escáner de QR o subir una imagen en el backend
    console.log("Simulando validación de QR...");
    setIsQrValidated(true);
  };

  return (
    <div className="register-form-box">
      <BackButton onClick={handleBack} />
      <h2>Crear Cuenta</h2>

      {/* Sección especial para el QR */}
      <div
        className={`qr-scanner-section ${isQrValidated ? "validated" : ""}`}
        onClick={handleQrClick}
      >
        <QrIcon />
        <div className="qr-scanner-text">
          <h4>Escaneo de QR</h4>
          <p>
            Sube tu código QR de estudiante o administrativo para una
            validación rápida.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="register-form">
        {error && <p className="form-error-message">{error}</p>}
        {/* Usamos un div para agrupar campos y ponerlos en una fila */}
        <div className="form-row">
          <Input
            id="nombre"
            name="nombre"
            label="Nombre(s)"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
          <Input
            id="apellidoP"
            name="apellidoP"
            label="Apellido Paterno"
            value={formData.apellidoP}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-row">
          <Input
            id="apellidoM"
            name="apellidoM"
            label="Apellido Materno"
            value={formData.apellidoM}
            onChange={handleChange}
            required
          />
          <Input
            id="boleta"
            name="boleta"
            label="Boleta / No. Empleado"
            value={formData.boleta}
            onChange={handleChange}
            required
          />
        </div>

        <Input
          id="correo"
          name="correo"
          label="Correo Institucional"
          type="email"
          value={formData.correo}
          onChange={handleChange}
          required
        />
        <Input
          id="password"
          name="password"
          label="Contraseña"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <Input
          id="confirmPassword"
          name="confirmPassword"
          label="Confirmar Contraseña"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        {/* Checkbox para el aviso de privacidad */}
        <div className="privacy-checkbox-section">
          <input
            type="checkbox"
            id="privacyAccepted"
            name="privacyAccepted"
            checked={formData.privacyAccepted}
            onChange={handleChange}
            required
          />
          <label htmlFor="privacyAccepted">
            He leído y acepto el{" "}
            <a href="/aviso-privacidad" target="_blank">
              aviso de privacidad
            </a>
            .
          </label>
        </div>

        <Button 
          type="submit" 
          variant="primary" 
          disabled={!isQrValidated || !formData.privacyAccepted || loading}
        >
          {loading ? 'Registrando...' : 'Registrarse'}
        </Button>
      </form>
    </div>
  );
};

export default RegisterForm;
