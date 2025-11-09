import React, { useState } from "react";
import "./EditProfileForm.css";
import Input from "../../../components/ui/input/Input";
import Button from "../../../components/ui/button/Button";
import { profileService } from "../../../services/profileService"; // Importamos el servicio
import { useAuth } from "../../../context/AuthContext.jsx";

const EditProfileForm = ({ currentUser, onSave, onCancel }) => {
  // Inicializamos el estado del formulario con los datos actuales del usuario
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: currentUser.name || "",
    phone: currentUser.phone || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Llamamos al servicio para actualizar
      const updatedData = await profileService.updateProfile(user.id, formData);
      onSave(updatedData); // Pasamos los datos actualizados a ProfilePage
    } catch (err) {
      setError(err.message || "No se pudo actualizar el perfil.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="edit-profile-form">
      <Input
        id="name"
        name="name"
        label="Nombre Completo"
        value={formData.name}
        onChange={handleChange}
        disabled={loading}
        required
      />
      <Input
        id="phone"
        name="phone"
        label="Teléfono"
        value={formData.phone}
        onChange={handleChange}
        disabled={loading}
      />

      {error && <p className="form-error-message">{error}</p>}

      <div className="form-actions">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={loading}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          variant="primary"
          style={{ backgroundColor: "#3921f2" }}
          disabled={loading}
        >
          {loading ? "Guardando..." : "Guardar Cambios"}
        </Button>
      </div>
    </form>
  );
};

export default EditProfileForm;
