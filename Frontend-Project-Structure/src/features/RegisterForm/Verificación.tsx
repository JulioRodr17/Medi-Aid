import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { httpClient } from "../../services/httpClient";
import Button from '../../components/ui/button/Button';

import './Verificacion.css';

function TokenValidator() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [status, setStatus] = useState("idle"); 
  // idle | validating | success | error

  const handleVerify = () => {
    if (!token) {
      navigate("/login");
      return;
    }

    setStatus("validating");

    httpClient.get(`/public/verify?token=${token}`)
      .then((response) => {
        setStatus("success");
        console.log(response.data);
      })
      .catch((err) => {
        setStatus("error");
        console.error(err);
      });
  };

  const goToLogin = () => navigate("/login");

  return (
    <div className="verificacion-container">
      <div className="verificacion-form-box">

        {status === "idle" && (
          <>
            <h2>Verificar correo</h2>
            <p className="form-instructions">
              Presiona el botón para validar tu correo electrónico.
            </p>

            <Button
              variant="primary"
              style={{ backgroundColor: '#3921f2' }}
              onClick={handleVerify}
            >
              Verificar
            </Button>
          </>
        )}

        {status === "validating" && (
          <>
            <h2>¡Validando!</h2>
            <p className="form-instructions">
              Se está validando su correo, espere un momento...
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <h2>¡Correo Validado!</h2>
            <p className="form-instructions">
              Se ha validado tu correo exitosamente.
            </p>

            <Button 
              variant="primary"
              style={{ backgroundColor: '#3921f2' }}
              onClick={goToLogin}
            >
              Ir al login
            </Button>
          </>
        )}

        {status === "error" && (
          <>
            <h2>Error</h2>
            <p className="form-instructions">
              No se pudo validar tu correo. Intenta de nuevo.
            </p>

            <Button 
              variant="primary"
              style={{ backgroundColor: '#3921f2' }}
              onClick={handleVerify}
            >
              Reintentar
            </Button>

            <Button 
              style={{ marginTop: 10 }}
              onClick={goToLogin}
            >
              Ir al login
            </Button>
          </>
        )}

      </div>
    </div>
  );
}

export default TokenValidator;
