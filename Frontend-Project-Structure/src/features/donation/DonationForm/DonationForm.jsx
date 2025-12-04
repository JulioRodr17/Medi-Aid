import React, { useState, useEffect } from "react";
import "./DonationForm.css";
import Input from "../../../components/ui/input/Input";
import Button from "../../../components/ui/button/Button";
import InfoModal from "../../../components/ui/InfoModal/InfoModal";
import { donationService } from "../../../services/donationService";
import { medicationService } from '../../../services/medicationService';
import { useAuth } from '../../../context/AuthContext';
import { notificationService } from "../../../services/notificationService";

const DonationForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [showOtro, setShowOtro] = useState(false);
  const [medicamentosExistentes, setMedicamentosExistentes] = useState([]);
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    userId: user.id,
    nombre: "",
    otroNombre: "",
    presentacion: "",
    dosis: "",
    cantidadNumerica: "",
    lote: "",
    caducidad: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const esInsumo = formData.nombre === "Insumo médico";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const nombresResponse = await medicationService.getNombres();
        setMedicamentosExistentes(nombresResponse);
      } catch (err) {
        console.error("Error cargando datos:", err);
      }
    };

    fetchData();
  }, []);

  const getMinDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 14);
    return date.toISOString().split("T")[0];
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "nombre") {
      if (value === "Otro...") {
        setShowOtro(true);
        setFormData(prev => ({
          ...prev,
          nombre: "",
          otroNombre: ""
        }));
      } else {
        setShowOtro(false);
        setFormData(prev => ({
          ...prev,
          nombre: value
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const finalData = { ...formData };

    // Si eligió Otro..., usamos el valor ingresado como nombre
    if (showOtro) {
      if (!formData.otroNombre.trim()) {
        setError("Debes ingresar el nombre del medicamento.");
        setLoading(false);
        return;
      }
      finalData.nombre = formData.otroNombre;
    }

    finalData.cantidadNumerica = parseInt(finalData.cantidadNumerica, 10);

    // Validación de fecha mínima (2 semanas) si NO es insumo
    if (!esInsumo) {
      const minDate = new Date();
      minDate.setDate(minDate.getDate() + 14);

      const selectedDate = new Date(finalData.caducidad);

      if (!finalData.caducidad || selectedDate < minDate) {
        setError("La fecha de caducidad debe ser de al menos 2 semanas a partir de hoy.");
        setLoading(false);
        return;
      }
    }

    // Si es insumo, anulamos lote, dosis y presentación
    if (esInsumo) {
      finalData.lote = null;
      finalData.dosis = null;
      finalData.presentacion = null;
    }

    try {
      const notificacion = {
        usuarioId: null,
        titulo: "Nueva Donación",
        descripcion: "Un usuario quiere donar " + finalData.cantidadNumerica + " de " + finalData.nombre,
        tipo: "INFO", // INFO | ALERTA | ERROR | ÉXITO
        url: "/admin/revisiones",
      };

      await donationService.postDonation(finalData);
      await notificationService.postNotifications(notificacion);
      
      setShowModal(true);

      setFormData({
        nombre: "",
        otroNombre: "",
        presentacion: "",
        dosis: "",
        cantidadNumerica: "",
        lote: "",
        caducidad: "",
      });

      setShowOtro(false);

    } catch (err) {
      setError(err.message || "Error al enviar la donación.");
    } finally {
      setLoading(false);
    }
  };

  const getCantidadLabel = () => {
    return esInsumo
      ? "Cantidad a donar (unidades)"
      : "Cantidad a donar (cajas/frascos)";
  };

  return (
    <>
      <div className="donation-form-container">
        <div className="info-banner">
          <strong>Atención:</strong> No se aceptan medicamentos caducados, abiertos,
          en mal estado o que requieran refrigeración estricta.
        </div>

        <form onSubmit={handleSubmit} className="donation-form">
          {error && <p className="form-error-message">{error}</p>}

          {/* SELECT DE MEDICAMENTOS */}
          <div className="form-group">
            <label>Medicamento</label>
            <select
              name="nombre"
              value={showOtro ? "Otro..." : formData.nombre}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona un medicamento</option>

              {medicamentosExistentes.map((med, index) => (
                <option key={index} value={med}>{med}</option>
              ))}

              <option value="Insumo médico">Insumo médico</option>
              <option value="Otro...">Otro...</option>
            </select>
          </div>

          {/* INPUT DE OTRO MEDICAMENTO */}
          {showOtro && (
            <Input
              id="otroNombre"
              name="otroNombre"
              label="Escribe el nombre del medicamento"
              type="text"
              value={formData.otroNombre}
              onChange={handleChange}
              required
            />
          )}

          {/* PRESENTACIÓN */}
          <Input
            id="presentacion"
            name="presentacion"
            label="Presentación"
            type="text"
            value={formData.presentacion}
            onChange={handleChange}
            placeholder="Ej. Tableta, Cápsula, Jarabe, Frasco"
            required
          />

          {/* DOSIS */}
          <Input
            id="dosis"
            name="dosis"
            label="Dosis (ej. 500 mg)"
            type="text"
            value={formData.dosis}
            onChange={handleChange}
            placeholder="Ej. 500 mg"
            disabled={esInsumo}
            required={!esInsumo}
          />

          {/* CANTIDAD */}
          <Input
            id="cantidadNumerica"
            name="cantidadNumerica"
            label={getCantidadLabel()}
            type="number"
            min="1"
            value={formData.cantidadNumerica}
            onChange={handleChange}
            required
          />

          {/* LOTE */}
          <Input
            id="lote"
            name="lote"
            label="Número de lote"
            type="text"
            value={formData.lote}
            onChange={handleChange}
            disabled={esInsumo}
            required={!esInsumo}
          />

          {/* CADUCIDAD */}
          <Input
            id="caducidad"
            name="caducidad"
            label="Fecha de caducidad"
            type="date"
            value={formData.caducidad}
            onChange={handleChange}
            disabled={esInsumo}
            min={getMinDate()}
            required={!esInsumo}
          />

          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? "Enviando..." : "Enviar Donación"}
          </Button>
        </form>
      </div>

      {showModal && (
        <InfoModal
          title="¡Gracias por tu donación!"
          message="El médico evaluará tu petición y serás notificado sobre ella."
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default DonationForm;
