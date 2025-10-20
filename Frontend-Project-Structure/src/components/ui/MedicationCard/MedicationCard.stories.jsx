import MedicationCard from './MedicationCard';
// Opcional: importa una imagen si quieres usarla en una de las historias

export default {
  // --- LA FICHA TÉCNICA ---
  title: 'UI/MedicationCard',
  component: MedicationCard,
  tags: ['autodocs'],
};

// --- LAS ESCENAS ---

// Escena 1: Una tarjeta estándar que usa el placeholder por defecto
export const Default = {
  args: {
    name: 'Paracetamol',
    dosage: '500 mg',
    // No pasamos imageUrl, así que usará el placeholder
  },
};

// Escena 2: Una tarjeta con un nombre muy largo para probar cómo se ajusta el texto
export const LongName = {
  args: {
    name: 'Metilfenidato de Liberación Prolongada',
    dosage: '10 mg',
  },
};

