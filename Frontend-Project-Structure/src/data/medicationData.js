// --- Simulación de la base de datos de medicamentos ---

const CATEGORIES = [
  'Pastillas', 
  'Capsulas', 
  'Jarabes', 
  'Insumos'
];

const getRandomExpiration = () => {
  const year = new Date().getFullYear() + Math.floor(Math.random() * 3) + 1; // Entre 1 y 3 años en el futuro
  const month = (Math.floor(Math.random() * 12) + 1).toString().padStart(2, '0');
  const day = (Math.floor(Math.random() * 28) + 1).toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const normalizeMedicationPayload = (medData) => {
  const baseName = medData.nombreMedicamento || medData.name || 'Medicamento sin nombre';
  const dosage = medData.dosis || medData.dosage || 'N/A';
  const categoryName = medData.categoria?.nombreCategoria || medData.category || 'General';
  const stockValue = medData.cantidadStock ?? medData.stock ?? 0;
  const stockMinValue = medData.stockMinimo ?? medData.stockMin ?? 5;
  const expiration = medData.fechaCaducidad || medData.expirationDate || getRandomExpiration();

  return {
    ...medData,
    id: medData.id,
    nombreMedicamento: baseName,
    name: baseName,
    dosis: dosage,
    dosage,
    categoria: medData.categoria || {
      id_categoria: medData.categoria?.id_categoria || null,
      nombreCategoria: categoryName,
      descripcion: medData.categoria?.descripcion || ''
    },
    category: categoryName,
    cantidadStock: stockValue,
    stock: stockValue,
    stockMinimo: stockMinValue,
    fechaCaducidad: expiration,
    expirationDate: expiration,
    isScarce: Boolean(medData.isScarce),
    imageUrl: medData.imageUrl || '',
  };
};

const createDummyMedication = (index) => {
  const category = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
  const stock = Math.floor(Math.random() * 100) + 5;
  const expiration = getRandomExpiration();
  const base = {
    id: `m${index + 1}`,
    name: `Medicamento ${index + 1}`,
    dosage: `${Math.floor(Math.random() * 10) * 50 + 50} mg`,
    description: 'Descripción detallada del medicamento, sus usos, contraindicaciones, y otra información relevante para el paciente o donante.',
    category,
    stock,
    cantidadStock: stock,
    stockMinimo: Math.max(5, Math.floor(Math.random() * 10) + 5),
    expirationDate: expiration,
    fechaCaducidad: expiration,
    expiringSoon: Math.random() < 0.2,
    imageUrl: '',
    isScarce: index < 3, // Algunos por defecto
    categoria: {
      id_categoria: (index % CATEGORIES.length) + 1,
      nombreCategoria: category,
      descripcion: '',
    },
  };

  return normalizeMedicationPayload(base);
};

let DUMMY_MEDICATIONS = Array.from({ length: 25 }, (_, i) => createDummyMedication(i));

const DUMMY_CATEGORIES = [
  { id_categoria: 1, nombre_categoria: 'Analgésicos', descripcion: 'Medicamentos para aliviar el dolor' },
  { id_categoria: 2, nombre_categoria: 'Antibióticos', descripcion: 'Medicamentos que combaten infecciones bacterianas' },
  { id_categoria: 3, nombre_categoria: 'Antiinflamatorios', descripcion: 'Reducen la inflamación y el dolor' },
  { id_categoria: 4, nombre_categoria: 'Antihipertensivos', descripcion: 'Controlan la presión arterial alta' },
  { id_categoria: 5, nombre_categoria: 'Vitaminas y suplementos', descripcion: 'Complementos nutricionales' }
];

const getScarceSnapshot = () => {
  return DUMMY_MEDICATIONS
    .filter(med => med.isScarce)
    .map(med => ({
      id: med.id,
      name: med.nombreMedicamento || med.name,
    }));
};

// Simulación de obtener categorías
export const simulateGetCategories = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Simulando API: obteniendo categorías');
      resolve(DUMMY_CATEGORIES);
    }, 200); // Pequeña demora para simular llamada real
  });
};

// --- Simulación de la lógica de la API ---

export const simulateGetMedications = (filters = {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Aquí en un futuro podríamos simular la búsqueda y paginación
      console.log('Simulando API: Obteniendo medicamentos con filtros:', filters);
      const page = Number.isFinite(filters.page) && filters.page > 0 ? filters.page : 0;
      let size = Number.isFinite(filters.size) ? filters.size : 8;
      if (size <= 0) {
        size = DUMMY_MEDICATIONS.length; // Equivale a traer todos
      }
      const start = page * size;
      const end = size === DUMMY_MEDICATIONS.length ? DUMMY_MEDICATIONS.length : start + size;
      const totalPages = Math.max(1, Math.ceil(DUMMY_MEDICATIONS.length / size));
      resolve({
        data: DUMMY_MEDICATIONS.slice(start, end),
        totalPages
      });
    }, 400);
  });
};

export const simulateGetScarceMedications = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getScarceSnapshot());
    }, 300);
  });
};

/**
 * Simula la obtención de estadísticas del inventario.
 */
export const simulateGetInventoryStats = () => {
  return new Promise((resolve) => {
    // TODO: BACKEND - Esta lógica debe estar en el backend
    const totalMeds = DUMMY_MEDICATIONS.length;
    const typesOfMeds = CATEGORIES.length;
    const expiringSoon = DUMMY_MEDICATIONS.filter(m => m.expiringSoon).length;
    const scarceMedsCount = getScarceSnapshot().length;

    setTimeout(() => {
      resolve({
        totalMeds,
        typesOfMeds,
        expiringSoon,
        scarceMedsCount 
      });
    }, 300);
  });
};

/**
 * Simula añadir un nuevo medicamento.
 */
export const simulateAddMedication = (medData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // TODO: BACKEND - Esta lógica debe estar en el backend
      const normalized = normalizeMedicationPayload({
        ...medData,
        id: `m${Math.floor(Math.random() * 1000)}`,
        expiringSoon: false,
        isScarce: false,
      });
      DUMMY_MEDICATIONS.unshift(normalized);
      resolve(normalized);
    }, 500);
  });
};

/**
 * Simula la actualización de un medicamento.
 */
export const simulateUpdateMedication = (medId, medData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // TODO: BACKEND - Esta lógica debe estar en el backend
      const target = DUMMY_MEDICATIONS.find(med => med.id === medId);
      if (!target) {
        resolve(null);
        return;
      }

      const normalized = normalizeMedicationPayload({
        ...target,
        ...medData,
        id: medId,
        isScarce: medData.isScarce ?? target.isScarce,
      });

      DUMMY_MEDICATIONS = DUMMY_MEDICATIONS.map(med => 
        med.id === medId ? normalized : med
      );

      resolve(normalized);
    }, 500);
  });
};

/**
 * Simula la eliminación de un medicamento.
 */
export const simulateDeleteMedication = (medId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // TODO: BACKEND - Esta lógica debe estar en el backend
      DUMMY_MEDICATIONS = DUMMY_MEDICATIONS.filter(med => med.id !== medId);
      resolve({ success: true, message: 'Medicamento eliminado' });
    }, 500);
  });
};

export const simulateSetScarceStatus = (medId, shouldBeScarce) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const target = DUMMY_MEDICATIONS.find(med => med.id === medId);
      if (!target) {
        reject(new Error('Medicamento no encontrado.'));
        return;
      }

      const currentScarce = DUMMY_MEDICATIONS.filter(med => med.isScarce);
      if (shouldBeScarce && !target.isScarce && currentScarce.length >= 5) {
        reject(new Error('Solo puedes marcar hasta 5 medicamentos como escasos.'));
        return;
      }

      target.isScarce = shouldBeScarce;
      DUMMY_MEDICATIONS = DUMMY_MEDICATIONS.map(med => 
        med.id === medId ? target : med
      );

      resolve({
        medication: target,
        scarceMeds: getScarceSnapshot(),
      });
    }, 300);
  });
};