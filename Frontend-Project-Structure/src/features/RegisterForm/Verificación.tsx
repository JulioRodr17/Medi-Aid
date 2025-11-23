import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { httpClient } from "../../services/httpClient";
import Button from '../../components/ui/button/Button';

import './Verificacion.css';

function TokenValidator() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [status, setStatus] = useState("validating"); // validating | success | error
  const hasFetched = useRef(false); // <-- ref para evitar ejecución doble

  useEffect(() => {
    if (hasFetched.current) return; // ya se ejecutó
    hasFetched.current = true;

    if (!token) {
      navigate("/login");
      return;
    }

    httpClient.get(`/public/verify?token=${token}`)
      .then((response) => {
        setStatus("success");
        // Puedes usar response.data si quieres mostrar el mensaje real
        console.log(response.data);
      })
      .catch((err) => {
        setStatus("error");
        console.error(err);
      });
  }, [token, navigate]);

  if (status === "validating") {
    return (
      <div className="verificacion-form-box">
        <h2>¡Validando!</h2>
        <p className="form-instructions">
          Se está validando su correo.
        </p>
      </div>
    );
  }

  return (
    <div className="verificacion-container">
      <div className="verificacion-form-box">
        {status === "success" ? (
          <>
            <h2>¡Correo Validado!</h2>
            <p className="form-instructions">
              Se ha validado tu correo exitosamente.
            </p>
          </>
        ) : (
          <>
            <h2>Error</h2>
            <p className="form-instructions">
              No se pudo validar tu correo. Intenta de nuevo.
            </p>
          </>
        )}

        <Button 
          variant="primary"
          style={{ backgroundColor: '#3921f2' }}
          onClick={() => navigate("/login")}
        >
          Aceptar
        </Button>
      </div>
    </div>
  );
}

export default TokenValidator;
