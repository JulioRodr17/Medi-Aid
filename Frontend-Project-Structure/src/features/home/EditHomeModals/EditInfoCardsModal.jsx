import React, { useState, useEffect } from 'react';
import './EditCarouselModal.css'; // Reutilizamos estilos
import Input from '../../../components/ui/input/Input';
import Button from '../../../components/ui/button/Button';

const EditInfoCardsModal = ({ currentData, onSave, onCancel }) => {
  const safeData = currentData || [];

  const [cards, setCards] = useState(safeData);
  
  useEffect(() => {
    if (currentData) {
      setCards(currentData);
    }
  }, [currentData]);

  const handleChange = (id, field, value) => {
    setCards(prev => prev.map(c => 
      c.id === id ? { ...c, [field]: value } : c
    ));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(cards);
  };

  if (!cards || cards.length === 0) {
    return <p>No hay tarjetas para editar.</p>;
  }


  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ maxHeight: '400px', overflowY: 'auto', paddingRight: '10px' }}>
        {cards.map((card, index) => (
          <div key={card.id || index} style={{ borderBottom: '1px solid #eee', paddingBottom: '1rem', marginBottom: '1rem' }}>
            <strong style={{ display: 'block', marginBottom: '0.5rem', color: '#555' }}>
              Tarjeta #{index + 1}
            </strong>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '10px', marginBottom: '0.5rem' }}>
              <Input 
                label="Emoji/Icono" 
                value={card.icon} 
                onChange={(e) => handleChange(card.id, 'icon', e.target.value)} 
              />
              <Input 
                label="Título" 
                value={card.title} 
                onChange={(e) => handleChange(card.id, 'title', e.target.value)} 
              />
            </div>
            
            <Input 
              label="Texto" 
              value={card.text} 
              onChange={(e) => handleChange(card.id, 'text', e.target.value)} 
            />
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '1rem', borderTop: '1px solid #eee', paddingTop: '1rem' }}>
        <Button variant="secondary" onClick={onCancel} type="button">Cancelar</Button>
        <Button variant="primary" type="submit">Guardar Cambios</Button>
      </div>
    </form>
  );
};

export default EditInfoCardsModal;