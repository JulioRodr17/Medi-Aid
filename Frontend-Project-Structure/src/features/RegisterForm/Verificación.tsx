import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { httpClient } from "../../services/httpClient";

function TokenValidator() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  React.useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    httpClient.get(`/public/verify?token=${token}`)
      .then(() => {
        alert("Usuario validado con éxito.");
        navigate("/login");
      })
      .catch(() => {
        alert("Error al validar al usuario.")
        navigate("/login");
      });
  }, [token, navigate]);

  return <div>Validando...</div>;
}

export default TokenValidator;
