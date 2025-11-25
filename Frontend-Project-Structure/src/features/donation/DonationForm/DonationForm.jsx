import React, { useState } from 'react';
import './DonationForm.css';
import Input from '../../../components/ui/input/Input';
import Button from '../../../components/ui/button/Button';
import InfoModal from '../../../components/ui/InfoModal/InfoModal';
import { donationService } from '../../../services/donationService'; // Importamos el servicio

const DonationForm = () => {
  // Estado para el modal de éxito
  const [showModal, setShowModal] = useState(false);

  // Estado para todos los campos del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    tipo: 'pastilla', // Valor por defecto
    concentracion: '',
    cantidadNumerica: '',
    cantidadTipo: 'caja', // Valor por defecto
    lote: '',
    caducidad: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value.toLowerCase(),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    let finalData = { ...formData };

    // Convertir cantidad a número entero
    finalData.cantidadNumerica = parseInt(finalData.cantidadNumerica, 10);

    if (formData.tipo === 'insumo') {
      // Para insumos, estos campos no aplican y deben ser null en la BD
      finalData.lote = null;
      finalData.caducidad = null; 
      finalData.concentracion = null;
    } else {
      // Para medicamentos, si el lote no se llenó (opcional), enviar null
      if (!finalData.lote) finalData.lote = null;

      // Si el tipo no requiere concentración (ej. jarabe según la UI actual), enviar null
      if (formData.tipo !== 'pastilla' && formData.tipo !== 'capsula') {
        finalData.concentracion = null;
      }
    }
    
    try {
      // Llamamos al servicio de donación
      await donationService.postDonation(finalData);
      
      // Si todo sale bien, mostramos el modal de éxito
      setShowModal(true);
      // Opcional: Resetear el formulario
      setFormData({
        nombre: '', tipo: 'pastilla', concentracion: '',
        cantidadNumerica: '', lote: '', caducidad: '',
      });

    } catch (err) {
      setError(err.message || 'Error al enviar la donación.');
    } finally {
      setLoading(false);
    }
  };

  const getCantidadLabel = () => {
     if (formData.tipo === 'insumo') {
      return 'Número de insumos';
    }
    return 'Número de cajas/frascos';
  };

  return (
    <>
      <div className="donation-form-container">
        {/* Banner Informativo */}
        <div className="info-banner">
          <strong>Atención:</strong> No se aceptan medicamentos caducados, abiertos,
          en mal estado o que requieran refrigeración estricta.
        </div>

        <form onSubmit={handleSubmit} className="donation-form">
          {/* TODO: BACKEND (Mejora Futura)
              Este campo 'nombre' será un <input> de texto por ahora,
              pero en un futuro ideal, se conectará al backend para ser un campo
              de autocompletar.
          */}
          {error && <p className="form-error-message">{error}</p>}
          <Input
            id="nombre"
            name="nombre"
            label="Nombre del Medicamento"
            type="text"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Ej. Paracetamol"
            required
          />
          
          <div className="form-group">
            <label htmlFor="tipo">Tipo de Medicamento</label>
            <select id="tipo" name="tipo" value={formData.tipo} onChange={handleChange} required>
              <option value="pastilla">Pastilla</option>
              <option value="capsula">Cápsula</option>
              <option value="jarabe">Jarabe</option>
              <option value="insumo">Insumo (Gasas, jeringas, etc.)</option>
            </select>
          </div>

          {/* --- Campo Condicional: Concentración --- */}
          {(formData.tipo === 'pastilla' || formData.tipo === 'capsula') && (
            <Input
              id="concentracion"
              name="concentracion"
              label="Concentración (ej. 500 mg)"
              type="text"
              value={formData.concentracion}
              onChange={handleChange}
              placeholder="Ej. 500 mg"
              required
            />
          )}

          <Input
            id="cantidadNumerica"
            name="cantidadNumerica"
            label={getCantidadLabel()}
            type="number"
            min="1" // Buena práctica añadir un mínimo
            value={formData.cantidadNumerica}
            onChange={handleChange}
            placeholder="Ej. 3"
            required
          />

          {formData.tipo !== 'insumo' && (
            <Input
              id="lote"
              name="lote"
              label="Número de Lote"
              type="text"
              value={formData.lote}
              onChange={handleChange}
              placeholder="Ej. LOTE-123XYZ"
            />
          )}

          {/* La fecha de caducidad sigue siendo condicional (disabled) */}
          <Input
            id="caducidad"
            name="caducidad"
            label="Fecha de Caducidad"
            type="date"
            value={formData.caducidad}
            onChange={handleChange}
            disabled={formData.tipo === 'insumo'}
          />

          <Button 
            type="submit" 
            variant="primary"
            disabled={loading}
          >
            {loading ? 'Enviando...' : 'Enviar Donación'}
          </Button>
        </form>
      </div>

      {/* --- Modal Condicional --- */}
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