import React, { useState } from 'react';
import './EditProfileForm.css';
import Input from '../../../components/ui/input/Input';
import Button from '../../../components/ui/button/Button';


const EditProfileForm = ({ currentUser, onSave, onCancel }) => {
  // Inicializamos el estado del formulario con los datos actuales del usuario
  const [formData, setFormData] = useState({
    name: currentUser.name || '',
    phone: currentUser.phone || '',
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
    // TODO: BACKEND - Aquí se llamaría a la API para guardar los datos
    console.log('Guardando perfil:', formData);
    onSave(formData); // Llama a la función onSave (que cerrará el modal)
  };

  return (
    <form onSubmit={handleSubmit} className="edit-profile-form">
      <Input
        id="name"
        name="name"
        label="Nombre Completo"
        type="text"
        value={formData.name}
        onChange={handleChange}
        placeholder="Tu nombre completo"
        required
      />
      <Input
        id="phone"
        name="phone"
        label="Teléfono"
        type="tel"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Ej. 55-1234-5678"
      />
      
      <div className="form-actions">
        <Button 
          type="button" 
          variant="secondary" 
          onClick={onCancel}
        >
          Cancelar
        </Button>
        <Button 
          type="submit" 
          variant="primary" 
          style={{ backgroundColor: '#3921f2' }} // Tu color primario
        >
          Guardar Cambios
        </Button>
      </div>
    </form>
  );
};

export default EditProfileForm;
