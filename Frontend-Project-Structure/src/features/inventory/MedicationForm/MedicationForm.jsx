import React, { useState, useEffect } from 'react';
import './MedicationForm.css';
import Input from '../../../components/ui/input/Input';
import Button from '../../../components/ui/button/Button';
import { medicationService } from '../../../services/medicationService';

const MedicationForm = ({ medication, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    id: medication?.id || null,
    nombreMedicamento: medication?.nombreMedicamento || '',
    categoria: medication?.categoria?.id || null,
    descripcion: medication?.descripcion || '',
    presentacion: medication?.presentacion || '',
    dosis: medication?.dosis || '',
    cantidadStock: medication?.cantidadStock || 0,
    stockMinimo: medication?.stockMinimo || 5,
    fechaCaducidad: medication?.fechaCaducidad || '',
    uso: medication?.uso || ''
  });

  const [categories, setCategories] = useState([]);
  const [nombres, setNombres] = useState([]);
  const [selectedNombre, setSelectedNombre] = useState("otro"); // default
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // NUEVOS ESTADOS para imagen/url
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(medication?.imageUrl || null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await medicationService.getCategories();
        const nombresResponse = await medicationService.getNombres();

        setCategories(categoriesResponse);
        setNombres(nombresResponse);

        if (!medication && categoriesResponse.length > 0) {
          setFormData(prev => ({ ...prev, categoria: categoriesResponse[0].id }));
        }

        // Manejo del select de nombres
        const exists = nombresResponse.some(n => n === medication?.nombreMedicamento);
        if (medication) {
          if (exists) setSelectedNombre(medication.nombreMedicamento);
          else setSelectedNombre("otro");
        }
      } catch (err) {
        console.error("Error cargando datos:", err);
      }
    };

    fetchData();
  }, [medication]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "categoria") {
      setFormData(prev => ({ ...prev, [name]: Number(value) }));
      return;
    }

    if (name === "nombreMedicamentoSelect") {
      setSelectedNombre(value);
      if (value !== "otro") setFormData(prev => ({ ...prev, nombreMedicamento: value }));
      else setFormData(prev => ({ ...prev, nombreMedicamento: '' }));
      return;
    }

    if (name === "nombreMedicamento") {
      setFormData(prev => ({ ...prev, nombreMedicamento: value }));
      return;
    }

    // Para inputs normales
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = new FormData();

      payload.append("medication", JSON.stringify({
        ...formData,
        activo: true,
        categoria: categories.find(cat => cat.id === formData.categoria) || null
      }));
    
      payload.append("imagen", imageFile);
      await onSave(payload);

    } catch (err) {
      setError(err.message || 'Error al guardar el medicamento.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="medication-form">

      {/* SELECT DE NOMBRE DEL MEDICAMENTO */}
      <div className="form-group">
        <label htmlFor="nombreMedicamentoSelect">Nombre del Medicamento</label>
        <select
          id="nombreMedicamentoSelect"
          name="nombreMedicamentoSelect"
          value={selectedNombre}
          onChange={handleChange}
          disabled={loading}
        >
          {nombres.map(nombre => (
            <option key={nombre} value={nombre}>{nombre}</option>
          ))}
          <option value="otro">Otro...</option>
        </select>
      </div>

      {selectedNombre === "otro" && (
        <Input
          id="nombreMedicamento"
          name="nombreMedicamento"
          label="Nombre Personalizado"
          value={formData.nombreMedicamento}
          onChange={handleChange}
          disabled={loading}
          required
        />
      )}

      <div className="med-form-row">
        <Input
          id="dosis"
          name="dosis"
          label="Dosis (ej. 500 mg)"
          value={formData.dosis}
          onChange={handleChange}
          disabled={loading}
        />
        <Input
          id="presentacion"
          name="presentacion"
          label="Presentación"
          value={formData.presentacion}
          onChange={handleChange}
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <label htmlFor="categoria">Categoría</label>
        <select
          id="categoria"
          name="categoria"
          value={formData.categoria ?? ""}
          onChange={handleChange}
          disabled={loading || categories.length === 0}
          required
        >
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.nombreCategoria}</option>
          ))}
        </select>
      </div>

      <div className="med-form-row">
        <Input
          id="cantidadStock"
          name="cantidadStock"
          label="Stock (Unidades)"
          type="number"
          min="0"
          value={formData.cantidadStock}
          onChange={handleChange}
          disabled={loading}
          required
        />
        <Input
          id="stockMinimo"
          name="stockMinimo"
          label="Stock Mínimo"
          type="number"
          min="0"
          value={formData.stockMinimo}
          onChange={handleChange}
          disabled={loading}
        />
        <Input
          id="fechaCaducidad"
          name="fechaCaducidad"
          label="Fecha de Caducidad"
          type="date"
          value={formData.fechaCaducidad}
          onChange={handleChange}
          disabled={loading}
        />
      </div>

      <Input
        id="descripcion"
        name="descripcion"
        label="Descripción"
        value={formData.descripcion}
        onChange={handleChange}
        disabled={loading}
      />

      {/* --- NUEVA SECCIÓN PARA IMAGEN / URL --- */}
      <div className="form-group">
        <label>Imagen del medicamento</label>

        <input 
          type="file" 
          accept="image/*" 
          onChange={(e) => {
            const file = e.target.files[0];
            setImageFile(file);
            setPreview(file ? URL.createObjectURL(file) : null);
          }} 
        />

        {(preview || medication?.src) && (
          <img
            src={preview || medication.src}
            style={{
              width: '100%',
              maxHeight: 200,
              objectFit: 'cover',
              marginTop: 10,
              borderRadius: 8
            }}
          />
        )}
      </div>

      {error && <p className="form-error-message">{error}</p>}

      <div className="med-form-actions">
        <Button type="button" variant="secondary" onClick={onCancel} disabled={loading}>
          Cancelar
        </Button>
        <Button type="submit" variant="primary" style={{ backgroundColor: '#3921f2' }} disabled={loading}>
          {loading ? 'Guardando...' : (medication ? 'Guardar Cambios' : 'Agregar Medicamento')}
        </Button>
      </div>
    </form>
  );
};

export default MedicationForm;
