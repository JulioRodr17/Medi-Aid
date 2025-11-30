import React, { useState, useEffect } from 'react';
import './EditCarouselModal.css';
import Input from '../../../components/ui/input/Input';
import Button from '../../../components/ui/button/Button';
import { homeService } from '../../../services/homeService';

const EditNoticiasModal = ({ onSave, onCancel }) => {
  const [items, setItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState('edit'); // 'edit' o 'add'

  const fetchNoticias = async () => {
    setLoading(true);
    try {
      const dataNoticias = await homeService.getCarousel(true);
      setItems(dataNoticias);
      setMode('edit');
      setCurrentIndex(0);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchNoticias(); }, []);

  const handleChange = (id, field, value) => {
    setItems(prev =>
      prev.map(item => item.id === id ? { ...item, [field]: value } : item)
    );
  };

  const handleImageChange = (id, file) => {
    const preview = URL.createObjectURL(file);
    setItems(prev =>
      prev.map(item => item.id === id ? { ...item, file, preview } : item)
    );
  };

  // Agregar noticia en blanco
  const handleAdd = () => {
    const newItem = {
      id: `new_${Date.now()}`,
      titulo: '',
      descripcion: '',
      fechaInicio: new Date().toISOString().split('T')[0],
      fechaExpiracion: '',
      activo: true,
      orden: items.length + 1,
      file: null,
      preview: null
    };

    setItems([newItem]); // ⚡ reemplazamos completamente los items
    setMode('add');
    setCurrentIndex(0);   // mostrar inmediatamente la nueva noticia
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentItem = items[currentIndex];

    const formData = new FormData();
    formData.append("noticias", JSON.stringify({
      id: currentItem.id.toString().startsWith("new_") ? null : currentItem.id,
      titulo: currentItem.titulo,
      descripcion: currentItem.descripcion,
      fechaInicio: currentItem.fechaInicio,
      fechaExpiracion: currentItem.fechaExpiracion,
      activo: currentItem.activo,
      orden: currentItem.orden
    }));

    if (currentItem.file) {
      formData.append("imagenes", currentItem.file);
    }

    await onSave(formData, mode);

    if (mode === 'add') fetchNoticias();
  };

  if (loading) return <p>Cargando noticias...</p>;
  if (!items.length && mode === 'edit') return <p>No hay noticias.</p>;

  const currentItem = items[currentIndex];

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ maxHeight:'55vh', overflowY:'auto', paddingRight:'10px' }}>
        <div style={{ borderBottom:'1px solid #eee', padding:'10px 0' }}>
          <strong>
            {mode === 'edit' ? `Noticia ${currentIndex + 1} de ${items.length}` : 'Nueva Noticia'}
          </strong>

          <Input
            label="Título"
            value={currentItem.titulo || ''}
            onChange={(e) => handleChange(currentItem.id, 'titulo', e.target.value)}
            required
          />

          <Input
            label="Descripción"
            value={currentItem.descripcion || ''}
            onChange={(e) => handleChange(currentItem.id, 'descripcion', e.target.value)}
            required
          />

          <Input
            type="date"
            label="Fecha inicio"
            value={currentItem.fechaInicio || ''}
            onChange={(e) => handleChange(currentItem.id, 'fechaInicio', e.target.value)}
            required
          />

          <Input
            type="date"
            label="Fecha expiración"
            value={currentItem.fechaExpiracion || ''}
            onChange={(e) => handleChange(currentItem.id, 'fechaExpiracion', e.target.value)}
            required
          />

          <Input
            type="number"
            label="Orden"
            value={currentItem.orden}
            onChange={(e) => handleChange(currentItem.id, 'orden', e.target.value)}
            required
          />

          <label>
            <input
              type="checkbox"
              style={{ marginRight: '5px' }}
              checked={currentItem.activo}
              onChange={(e) => handleChange(currentItem.id, 'activo', e.target.checked)}
            /> Activo
          </label>

          <input
            key={currentItem.id} // ⚡ fuerza que React reconstruya el input
            type="file"
            style={{ marginLeft: '10px' }}
            accept="image/*"
            onChange={(e) => handleImageChange(currentItem.id, e.target.files[0])}
            required={mode === 'add'}
          />

          {(currentItem.file || currentItem.src) && (
            <img
              src={currentItem.file ? currentItem.preview : currentItem.src}
              style={{ width:'100%', maxHeight:'180px', objectFit:'cover', marginTop:'8px', borderRadius:'8px' }}
            />
          )}
        </div>
      </div>

      {/* Navegación solo en edit */}
      {mode === 'edit' && items.length > 1 && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
          <Button type="button" disabled={currentIndex === 0} onClick={() => setCurrentIndex(prev => prev - 1)}>⬅️ Anterior</Button>
          <Button type="button" disabled={currentIndex === items.length - 1} onClick={() => setCurrentIndex(prev => prev + 1)}>Siguiente ➡️</Button>
        </div>
      )}

      <div style={{ display:'flex', justifyContent:'flex-end', gap:'10px', marginTop:'10px' }}>
        {mode === 'add' && (
          <Button type="button" variant="secondary" onClick={fetchNoticias}>⬅️ Regresar</Button>
        )}
        {mode === 'edit' && (
          <Button type="button" onClick={handleAdd}>+ Agregar noticia</Button>
        )}
        <Button type="button" variant="secondary" onClick={onCancel}>Cancelar</Button>
        <Button type="submit" variant="primary">Guardar</Button>
      </div>
    </form>
  );
};

export default EditNoticiasModal;
