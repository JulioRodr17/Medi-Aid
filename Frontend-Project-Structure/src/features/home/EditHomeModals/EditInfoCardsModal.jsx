import React, { useState, useEffect } from 'react';
import './EditCarouselModal.css';
import Input from '../../../components/ui/input/Input';
import Button from '../../../components/ui/button/Button';
import { homeService } from '../../../services/homeService';

const EditInfoCardsModal = ({ onSave, onCancel }) => {
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchCards = async () => {
    setLoading(true);
    try {
      const dataCards = await homeService.getCards(true);
      setCards(dataCards);
      setCurrentIndex(0);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const handleChange = (id, field, value) => {
    setCards(prev =>
      prev.map(card => card.id === id ? { ...card, [field]: value } : card)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Enviamos todas las cards al guardar
    await onSave(cards);
  };

  if (loading) return <p>Cargando tarjetas...</p>;
  if (!cards.length) return <p>No hay tarjetas disponibles.</p>;

  const currentCard = cards[currentIndex];

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ maxHeight:'55vh', overflowY:'auto', paddingRight:'10px' }}>
        <div style={{ borderBottom:'1px solid #eee', padding:'10px 0' }}>
          <strong>
            Tarjeta {currentIndex + 1} de {cards.length}
          </strong>

          <Input
            label="Emoji/Icono"
            value={currentCard.icon || ''}
            onChange={(e) => handleChange(currentCard.id, 'icon', e.target.value)}
            required
          />

          <Input
            label="Título"
            value={currentCard.title || ''}
            onChange={(e) => handleChange(currentCard.id, 'title', e.target.value)}
            required
          />

          <Input
            label="Texto"
            value={currentCard.text || ''}
            onChange={(e) => handleChange(currentCard.id, 'text', e.target.value)}
            required
          />

          <label>
            <input
              type="checkbox"
              style={{ marginRight: '5px' }}
              checked={currentCard.activo}
              onChange={(e) => handleChange(currentCard.id, 'activo', e.target.checked)}
            />
            Activo
          </label>
        </div>
      </div>

      {/* Navegación entre cards */}
      {cards.length > 1 && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
          <Button type="button" disabled={currentIndex === 0} onClick={() => setCurrentIndex(prev => prev - 1)}>⬅️ Anterior</Button>
          <Button type="button" disabled={currentIndex === cards.length - 1} onClick={() => setCurrentIndex(prev => prev + 1)}>Siguiente ➡️</Button>
        </div>
      )}

      <div style={{ display:'flex', justifyContent:'flex-end', gap:'10px', marginTop:'10px' }}>
        <Button type="button" variant="secondary" onClick={onCancel}>Cancelar</Button>
        <Button type="submit" variant="primary">Guardar</Button>
      </div>
    </form>
  );
};

export default EditInfoCardsModal;
