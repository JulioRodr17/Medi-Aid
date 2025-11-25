import React, { useState, useEffect, useMemo } from 'react';
import './InventoryPage.css';
import { medicationService } from '../../services/medicationService';
import InventoryStats from '../../features/inventory/InventoryStats/InventoryStats';
import InventoryTable from '../../features/inventory/InventoryTable/InventoryTable';

// TODO: Importar los modales cuando los creemos
import Modal from '../../components/ui/Modal/Modal';
import MedicationForm from '../../features/inventory/MedicationForm/MedicationForm';
import DeleteWarningModal from '../../features/inventory/DeleteWarningModal/DeleteWarningModal';
import Spinner from '../../components/ui/Spinner/Spinner';
import EmptyState from '../../components/ui/EmptyState/EmptyState';

const SCARCE_LIMIT = 5;

const InventoryPage = () => {
  // Estados para los datos
  const [stats, setStats] = useState(null);
  const [inventory, setInventory] = useState([]);
  
  // Estados de UI
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scarceActionError, setScarceActionError] = useState(null);
  const [scarceUpdatingId, setScarceUpdatingId] = useState(null);
  
  // Estados para los modales
  const [isAddOrEditModalOpen, setIsAddOrEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedMedication, setSelectedMedication] = useState(null);

  // Función para cargar todos los datos
  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      //const inventoryData = await medicationService.getMedications({ size: 0, sortBy: "fechaCaducidad", sortDirection: "DESC" });
      const inventoryData = await medicationService.getMedications({ size: 0, sortBy: "nombreMedicamento", sortDirection: "ASC" });
      const normalizedInventory = (inventoryData.data || []).map(med => {
        const identifier = med.id || med.id_medicamento || med.idMedicamento || med.codigo || `med-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
        return {
          ...med,
          id: identifier,
          isScarce: med.isScarce ?? med.esEscaso ?? false,
        };
      });

      const computedStats = summarizeMedicamentos(normalizedInventory);
      setStats(computedStats);
      setInventory(normalizedInventory); // getMedications devuelve { data: [...] }

    } catch (err) {
      console.error("Error al cargar inventario:", err);
      setError(err.message || 'No se pudieron cargar los datos.');
    } finally {
      setLoading(false);
    }
  };

  function summarizeMedicamentos(medicamentos) {
    const hoy = new Date();
    const proximos30Dias = 30 * 24 * 60 * 60 * 1000; // 30 días en milisegundos

    let totalMeds = 0;
    const nombreMedicamentosSet = new Set();
    let expiringSoon = 0;
    const scarceMedsSet = new Set();

    medicamentos.forEach(med => {
      // Total de cantidadStock
      totalMeds += med.cantidadStock;

      // Nombres de medicamentos diferentes
      nombreMedicamentosSet.add(med.nombreMedicamento);

      // Próximo a caducar
      if (med.fechaCaducidad) {
        const fechaCad = new Date(med.fechaCaducidad);
        const diffTime = fechaCad - hoy;
        if (diffTime >= 0 && diffTime <= proximos30Dias) {
          expiringSoon += med.cantidadStock;
        }
      }

      // Medicamentos escasos
      if (med.cantidadStock <= med.stockMinimo || med.isScarce) {
        scarceMedsSet.add(med.nombreMedicamento);
      }
    });

    return {
      totalMeds,
      typesOfMeds: nombreMedicamentosSet.size,
      expiringSoon,
      scarceMedsCount: scarceMedsSet.size
    };
  }


  // Cargar datos al montar el componente
  useEffect(() => {
    loadData();
  }, []);

  // --- Handlers para ABRIR Modales ---
  
  // Abre el modal en modo "Agregar"
  const handleOpenAdd = () => {
    setSelectedMedication(null); // Asegura que no haya datos de edición
    setIsAddOrEditModalOpen(true);
  };

  // Abre el modal en modo "Editar"
  const handleOpenEdit = (med) => {
    setSelectedMedication(med); // Guarda el medicamento a editar
    setIsAddOrEditModalOpen(true);
  };
  
  // Abre el modal de "Borrar"
  const handleOpenDelete = (med) => {
    setSelectedMedication(med); // Guarda el medicamento a borrar
    setIsDeleteModalOpen(true);
  };

  // --- Handlers para CERRAR Modales ---
  const handleCloseModals = () => {
    setIsAddOrEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setSelectedMedication(null); // Limpia la selección
  };

  // --- Handlers para ACCIONES (CRUD) ---

  const handleSave = async (formData) => {
    try {
      console.log(formData);
      if (selectedMedication) {
        await medicationService.updateMedication(formData);
      } else {
        await medicationService.addMedication(formData);
      }
      
      handleCloseModals(); // Cierra el modal
      loadData(); // Recarga toda la data para ver los cambios
    
    } catch (err) {
      console.error('Error al guardar:', err);
      // TODO: Mostrar el error en el modal en lugar de solo cerrarlo
      throw err; // Lanza el error para que el formulario lo muestre
    }
  };

  const handleDelete = async () => {
    if (!selectedMedication) return;
    
    try {
      await medicationService.deleteMedication(selectedMedication.id);
      
      handleCloseModals(); // Cierra el modal
      loadData(); // Recarga la data
    
    } catch (err) {
      console.error('Error al borrar:', err);
      // TODO: Mostrar el error en el modal
    }
  };

  const scarceCount = useMemo(() => inventory.filter(item => item.isScarce).length, [inventory]);

  const handleToggleScarce = async (med, nextValue) => {
    if (!med) return;
    if (nextValue && scarceCount >= SCARCE_LIMIT) {
      setScarceActionError(`Solo puedes marcar ${SCARCE_LIMIT} medicamentos como escasos.`);
      return;
    }
    try {
      setScarceActionError(null);
      setScarceUpdatingId(med.id);
      await medicationService.setScarceStatus(med.id, nextValue);
      setInventory(prev => {
        const updated = prev.map(item => (item.id === med.id ? { ...item, isScarce: nextValue } : item));
        setStats(summarizeMedicamentos(updated));
        return updated;
      });
    } catch (err) {
      setScarceActionError(err.message || 'No se pudo actualizar la lista de escasez.');
    } finally {
      setScarceUpdatingId(null);
    }
  };
  
  // --- Renderizado ---
  
  if (error) {
    return (
      <EmptyState
        icon="⚠️"
        title="No pudimos cargar el inventario"
        message={error}
        action={{ label: 'Reintentar', onClick: loadData }}
      />
    );
  }

  return (
    <>
      <div className="inventory-page">
        <h1 className="page-title">Inventario</h1>
        
        <InventoryStats stats={stats} />
        
        {loading && !stats ? ( // Muestra "cargando" solo si aún no hay nada
          <Spinner label="Cargando inventario..." />
        ) : (
          <InventoryTable 
            inventory={inventory}
            onAdd={handleOpenAdd}
            onEdit={handleOpenEdit}
            onDelete={handleOpenDelete}
            onToggleScarce={handleToggleScarce}
            togglingId={scarceUpdatingId}
            scarceMessage={scarceActionError}
            scarceCount={scarceCount}
            scarceLimit={SCARCE_LIMIT}
          />
        )}
      </div>
        
      {/* --- Renderizado de Modales --- */}

      {/* Modal para Agregar/Editar */}
      <Modal
        title={selectedMedication ? 'Editar Medicamento' : 'Agregar Medicamento'}
        isOpen={isAddOrEditModalOpen}
        onClose={handleCloseModals}
      >
        <MedicationForm
          medication={selectedMedication} // Pasa el med (o null) al formulario
          onSave={handleSave}
          onCancel={handleCloseModals}
        />
      </Modal>

      {/* Modal para Borrar */}
      <Modal
        title="Confirmar Eliminación"
        isOpen={isDeleteModalOpen}
        onClose={handleCloseModals}
      >
        <DeleteWarningModal
          medication={selectedMedication}
          onConfirm={handleDelete}
          onCancel={handleCloseModals}
        />
      </Modal>
    </>
  );
};

export default InventoryPage;