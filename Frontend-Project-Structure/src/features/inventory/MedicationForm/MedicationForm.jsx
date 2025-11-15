import React, { useState, useEffect } from 'react';
import './MedicationForm.css';
import Input from '../../../components/ui/input/Input';
import Button from '../../../components/ui/button/Button';

//TODO: Agregar categorias que existen en servicio medico
const CATEGORIES = [
  'Analgésico', 'Antibiótico', 'Antiinflamatorio', 'Antihistamínico',
  'Antiácido', 'Relajante muscular', 'Antiviral', 'Broncodilatador',
  'Diurético', 'Protector gástrico'
];

/**
 * Formulario para Agregar o Editar un Medicamento.
 * @param {object | null} medication - El objeto del medicamento a editar, o null si es para agregar.
 * @param {function} onSave - Función que se llama al guardar (recibe los nuevos datos).
 * @param {function} onCancel - Función que se llama al cancelar (cierra el modal).
 */
const MedicationForm = ({ medication, onSave, onCancel }) => {
  
  const [formData, setFormData] = useState({
    name: medication?.name || '',
    dosage: medication?.dosage || '',
    category: medication?.category || CATEGORIES[0], 
    stock: medication?.stock || 0,
    description: medication?.description || '',
    expirationDate: medication?.expirationDate || '', 
  })

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      await onSave(formData);
    } catch (err) {
      setError(err.message || 'Error al guardar el medicamento.');
    } finally {
      setLoading(false);
    }
  };

return (
    <form onSubmit={handleSubmit} className="medication-form">
      <div className="med-form-row">
        <Input
          id="name"
          name="name"
          label="Nombre del Medicamento"
          value={formData.name}
          onChange={handleChange}
          disabled={loading}
          required
        />
        <Input
          id="dosage"
          name="dosage"
          label="Dosis (ej. 500 mg)"
          value={formData.dosage}
          onChange={handleChange}
          disabled={loading}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="category">Categoría</label>
        <select 
          id="category" 
          name="category" 
          value={formData.category} 
          onChange={handleChange}
          disabled={loading}
          required
        >
          {CATEGORIES.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      
      <div className="med-form-row">
        <Input
          id="stock"
          name="stock"
          label="Stock (Unidades)"
          type="number"
          min="0"
          value={formData.stock}
          onChange={handleChange}
          disabled={loading}
          required
        />
        <Input
          id="expirationDate"
          name="expirationDate"
          label="Fecha de Caducidad"
          type="date"
          value={formData.expirationDate}
          onChange={handleChange}
          disabled={loading}
        />
      </div>
      
      <Input
        id="description"
        name="description"
        label="Descripción"
        value={formData.description}
        onChange={handleChange}
        disabled={loading}
      />

      {error && <p className="form-error-message">{error}</p>}

      <div className="med-form-actions">
        <Button type="button" variant="secondary" onClick={onCancel} disabled={loading}>
          Cancelar
        </Button>
        <Button 
          type="submit" 
          variant="primary" 
          style={{ backgroundColor: '#3921f2' }}
          disabled={loading}
        >
          {loading ? 'Guardando...' : (medication ? 'Guardar Cambios' : 'Agregar Medicamento')}
        </Button>
      </div>
    </form>
  );
};

export default MedicationForm;