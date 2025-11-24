import React, { useState,useEffect } from 'react';
import './EditCarouselModal.css';
import Input from '../../../components/ui/input/Input';
import Button from '../../../components/ui/button/Button';
import { homeService } from '../../../services/homeService';

const EditCarouselModal = ({ currentData, onSave, onCancel }) => {
  const safeData = currentData || [];

  const [items, setItems] = useState(safeData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentData) {
      setItems(currentData);
    }
  }, [currentData]);

  // Manejar cambio de URL de una imagen existente
  const handleChange = (id, field, value) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  // Agregar una nueva imagen (URL vacía por defecto)
  const handleAddImage = () => {
    const newId = `new_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
    setItems([...items, { id: newId, url: '', titulo: 'Nueva Imagen' }]);
  };

  // Eliminar imagen
  const handleDeleteImage = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(items);
  };

  if (!items) {
    return <p>No hay imágenes para editar.</p>;
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ maxHeight: '400px', overflowY: 'auto', paddingRight: '10px' }}>
        {items.map((item, index) => (
          <div 
            key={item.id ? item.id.toString() : `fallback-${index}`} 
            style={{ borderBottom: '1px solid #eee', padding: '10px 0', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong>Imagen #{index + 1}</strong>
              <Button 
                type="button" 
                variant="danger" 
                onClick={() => handleDeleteImage(item.id)}
                style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}
              >
                Eliminar
              </Button>
            </div>
            
            <Input 
              label="Título / Alt Text" 
              value={item.titulo || item.alt || ''} 
              onChange={(e) => handleChange(item.id, 'titulo', e.target.value)} 
            />
            <Input 
              label="URL de Imagen" 
              value={item.url} 
              onChange={(e) => handleChange(item.id, 'url', e.target.value)} 
            />
            
            {item.url && (
              <img 
                src={item.url} 
                alt="Preview" 
                style={{ width: '100px', height: '60px', objectFit: 'cover', borderRadius: '4px', marginTop: '5px' }}
                onError={(e) => e.target.style.display = 'none'} 
              />
            )}
          </div>
        ))}
      </div>
      
      <Button type="button" variant="secondary" onClick={handleAddImage}>
        + Agregar Nueva Imagen
      </Button>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '1rem', borderTop: '1px solid #eee', paddingTop: '1rem' }}>
        <Button variant="secondary" onClick={onCancel} type="button">Cancelar</Button>
        <Button variant="primary" type="submit">Guardar Cambios</Button>
      </div>
    </form>
  );
};

export default EditCarouselModal;