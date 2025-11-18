import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";
import Input from "../../components/ui/input/Input";
import Button from "../../components/ui/button/Button";
import BackButton from "../../components/ui/backbutton/BackButton";

import "./RegisterForm.css";

import { initQrScanner, stopQrScanner, processQR } from "../../services/QRScanner";

const QrCode = () => (
  <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M0 0H40V10H10V40H0V0ZM100 0H60V10H90V40H100V0ZM0 100H40V90H10V60H0V100ZM100 100H60V90H90V60H100V100ZM60 20H80V40H60V20ZM40 40H20V20H40V40ZM20 60H40V80H20V60ZM60 60H80V80H60V60ZM50 50H70V70H90V50H70V30H50V50Z" fill="#333"/>
  </svg>
);

const Upload = () => (
  <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 10L25 35H40V65H60V35H75L50 10Z" fill="#333"/>
    <rect x="20" y="75" width="60" height="10" fill="#333" />
  </svg>
);

const RegisterForm = () => {
//================================================== Variables ==================================================
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: '',
    apellidoP: '',
    apellidoM: '',
    boleta: '',
    correo: '',
    telefono: '',
    password: '',
    foto: '',
    confirmPassword: '',
    privacyAccepted: false,
  });
  
  const scannerRef = useRef(null);

  const [errors, setErrors] = useState({}); // Estado para los errores
  const [isQrValidated, setIsQrValidated] = useState(false);
  const [isQrloading, setIsQrloading] = useState(false);

//================================================== Manejo de cambios en el formulario ==================================================
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

//================================================== Manejo del envío del formulario ==================================================
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const payload = {
      nombre: formData.nombre,
      apellidoPaterno: formData.apellidoP,
      apellidoMaterno: formData.apellidoM,
      boleta: formData.boleta,
      correo: formData.correo,
      telefono: formData.telefono,
      contrasena: formData.password,
      foto: formData.foto,
      rol: formData.rol
    };

    console.log(payload);

    if (!validateForm()) return;
    
    else if (!isQrValidated) {
      setErrors((prev) => ({ ...prev, qr: '*Debes validar tu QR antes de continuar.' }));
      return;
    }

    try {
      const datos = await authService.register(payload);
      alert('Registro exitoso');
      navigate("/login");
    } catch (error) { 
      alert('Error en el registro: ' + error.message);
      return;
    }

  };

//================================================== Manejo del botón de regreso ==================================================
  const handleBack = () => {
    navigate(-1);
  };

//================================================== Manejo de el escaneo por cámara ==================================================
  const handleQRCam = async () => {
    const scanner = initQrScanner(scannerRef, "reader");
    await stopQrScanner(scanner);

    try {
      await scanner.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 400 },
        async (decodedText) => {
          setIsQrloading(true);
          await processQR(decodedText, scanner, setFormData, setIsQrValidated);
          setIsQrloading(false);
        }
      );
      
    } catch (err) {
      console.error("Error al iniciar cámara:", err);
    }
  }
//================================================== Manejo de el escaneo por archivo ==================================================
const handleQRUpload = async () => {

};

//================================================== Validación del formulario ==================================================
  const validateForm = () => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    const emailRegex = /^[\w-.]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,4}$/;
    const phoneRegex = /^(\+52)?\s?\d{10}$/;
    const boletaRegex = /^[0-9]{4,20}$/;

    const newErrors = {};

    if (!formData.nombre.trim()) newErrors.nombre = '*El nombre es obligatorio.';
    if (!formData.apellidoP.trim()) newErrors.apellidoP = '*El apellido paterno es obligatorio.';
    if (!formData.boleta.match(boletaRegex)) newErrors.boleta = '*La boleta o número de empleado no es válido.';
    if (!emailRegex.test(formData.correo)) newErrors.correo = '*El correo electrónico no es válido.';
    if (formData.telefono && !phoneRegex.test(formData.telefono)) newErrors.telefono = '*El número de teléfono no tiene un formato válido (10 dígitos, opcional +52).';
    if (!passwordRegex.test(formData.password)) newErrors.password = '*La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y símbolos.';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = '*Las contraseñas no coinciden.';
    if (!formData.privacyAccepted) newErrors.privacyAccepted = '*Debes aceptar el aviso de privacidad.';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // true si no hay errores
  };

  //================================================== Vista HTML ==================================================
return (
    <div className="register-form-box">
      <BackButton onClick={handleBack} />
      <h2>Crear Cuenta</h2>

      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-row">
          <div>
            <Input id="nombre" name="nombre" label="Nombre(s)" value={formData.nombre} onChange={handleChange} required />
            {errors.nombre && <span className="error-message">{errors.nombre}</span>}
          </div>
          <div>
            <Input id="apellidoP" name="apellidoP" label="Apellido Paterno" value={formData.apellidoP} onChange={handleChange} required />
            {errors.apellidoP && <span className="error-message">{errors.apellidoP}</span>}
          </div>
        </div>

        <div className="form-row">
          <div>
            <Input id="apellidoM" name="apellidoM" label="Apellido Materno" value={formData.apellidoM} onChange={handleChange} required />
            {errors.apellidoM && <span className="error-message">{errors.apellidoM}</span>}
          </div>
          <div>
            <Input id="boleta" name="boleta" label="Boleta / No. Empleado" value={formData.boleta} onChange={handleChange} required />
            {errors.boleta && <span className="error-message">{errors.boleta}</span>}
          </div>
        </div>

        <div>
          <Input id="correo" name="correo" label="Correo Institucional" type="email" value={formData.correo} onChange={handleChange} required />
          {errors.correo && <span className="error-message">{errors.correo}</span>}
        </div>

        <div>
          <Input id="telefono" name="telefono" label="Teléfono (opcional)" type="tel" value={formData.telefono} onChange={handleChange} />
          {errors.telefono && <span className="error-message">{errors.telefono}</span>}
        </div>

        <div>
          <Input id="password" name="password" label="Contraseña" type="password" value={formData.password} onChange={handleChange} required />
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>

        <div>
          <Input id="confirmPassword" name="confirmPassword" label="Confirmar Contraseña" type="password" value={formData.confirmPassword} onChange={handleChange} required />
          {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
        </div>

        {/* QR */}
        <div className={`qr-scanner-section ${isQrValidated ? 'validated' : ''}`} >
          <div className="qr-scanner-text" onClick={handleQRCam}>
            <QrCode size={80}/>
            <p>Escanear QR</p>
          </div>
          <div className="qr-scanner-text">
            <h4>Escaneo de QR</h4>
            <p>Sube o escanea tu código QR de estudiante o administrativo para validar tu cuenta.</p>
            <p>Nota: Este código se encuentra al reverso de tu credencial.</p>
            {errors.qr && <span className="error-message">{errors.qr}</span>}
          </div>
          <div className="qr-scanner-text" onClick={handleQRUpload}>
            <Upload size={80}/>
            <p>Subir QR</p>
          </div>
        </div>
        {formData.rol && <span className="info-message">El QR corresponde a {formData.rol}</span>}


        {/* Contenedor para la vista previa del QR */}
        <div id="reader" style={{ maxWidth: 500, maxHeight: 400 }}>
          {isQrloading && (
          <div className="qr-loading">
            <div className="qr-spinner"></div>
            <p className="qr-loading-text">Cargando...</p>
            <p className="qr-subtext">Esto podría demorar algunos segundos, por favor espere.</p>
          </div>
        )}
        </div>
        

        <div className="privacy-checkbox-section">
          <input type="checkbox" id="privacyAccepted" name="privacyAccepted" checked={formData.privacyAccepted} onChange={handleChange} required />
          <label htmlFor="privacyAccepted">
            He leído y acepto el <a href="/aviso-privacidad" target="_blank">aviso de privacidad</a>.
          </label>
          {errors.privacyAccepted && <span className="error-message">{errors.privacyAccepted}</span>}
        </div>

        <Button type="submit" variant="primary" disabled={!isQrValidated || !formData.privacyAccepted}>
          Registrarse
        </Button>
      </form>
    </div>
  );
};


export default RegisterForm;
