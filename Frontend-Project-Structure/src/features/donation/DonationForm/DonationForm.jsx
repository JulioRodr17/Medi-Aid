import React, { useState } from 'react';
import './DonationForm.css';
import Input from '../../../components/ui/input/Input';
import Button from '../../../components/ui/button/Button';
import InfoModal from '../../../components/ui/InfoModal/InfoModal';

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Preparamos los datos finales para enviar
    let finalData = { ...formData };

    // Si es 'insumo', nos aseguramos de que 'lote' y 'caducidad' se envíen vacíos o nulos
    if (formData.tipo === 'insumo') {
      finalData.lote = null;
      finalData.caducidad = ''; // O null, dependiendo de lo que prefiera tu backend
    }

    // TODO: BACKEND
    // Aquí es donde haríamos la llamada (fetch) a la API del backend
    // para enviar el objeto 'finalData'.
    console.log('Datos de donación enviados:', finalData);
    
    // Dejamos esto por ahora para que la UI siga funcionando
    setShowModal(true);
  };

  // Lógica para etiquetas condicionales
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

          <Button type="submit" variant="primary">
            Enviar Donación
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
