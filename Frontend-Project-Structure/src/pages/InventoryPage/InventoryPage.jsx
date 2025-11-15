import React, { useState, useEffect } from 'react';
import './InventoryPage.css';
import { medicationService } from '../../services/medicationService';
import InventoryStats from '../../features/inventory/InventoryStats/InventoryStats';
import InventoryTable from '../../features/inventory/InventoryTable/InventoryTable';

// TODO: Importar los modales cuando los creemos
import Modal from '../../components/ui/Modal/Modal';
import MedicationForm from '../../features/inventory/MedicationForm/MedicationForm';
import DeleteWarningModal from '../../features/inventory/DeleteWarningModal/DeleteWarningModal';

const InventoryPage = () => {
  // Estados para los datos
  const [stats, setStats] = useState(null);
  const [inventory, setInventory] = useState([]);
  
  // Estados de UI
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Estados para los modales
  const [isAddOrEditModalOpen, setIsAddOrEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedMedication, setSelectedMedication] = useState(null);

  // Función para cargar todos los datos
  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // TODO: BACKEND - Llamamos a los servicios
      // Usamos Promise.all para que se carguen al mismo tiempo
      const [statsData, inventoryData] = await Promise.all([
        medicationService.getInventoryStats(),
        medicationService.getMedications() // Reutilizamos este servicio
      ]);
      
      setStats(statsData);
      setInventory(inventoryData.data); // getMedications devuelve { data: [...] }

    } catch (err) {
      console.error("Error al cargar inventario:", err);
      setError(err.message || 'No se pudieron cargar los datos.');
    } finally {
      setLoading(false);
    }
  };

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
      if (selectedMedication) {
        // --- Lógica de ACTUALIZAR ---
        // TODO: BACKEND - Llamar al servicio de actualización
        await medicationService.updateMedication(selectedMedication.id, formData);
      } else {
        // --- Lógica de AGREGAR ---
        // TODO: BACKEND - Llamar al servicio de agregar
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
      // --- Lógica de BORRAR ---
      // TODO: BACKEND - Llamar al servicio de borrado
      await medicationService.deleteMedication(selectedMedication.id);
      
      handleCloseModals(); // Cierra el modal
      loadData(); // Recarga la data
    
    } catch (err) {
      console.error('Error al borrar:', err);
      // TODO: Mostrar el error en el modal
    }
  };
  
  // --- Renderizado ---
  
  if (error) {
    return <div className="page-error">Error al cargar: {error}</div>;
  }

  return (
    <>
      <div className="inventory-page">
        <h1 className="page-title">Inventario</h1>
        
        <InventoryStats stats={stats} />
        
        {loading && !stats ? ( // Muestra "cargando" solo si aún no hay nada
          <p>Cargando inventario...</p>
        ) : (
          <InventoryTable 
          inventory={inventory}
          onAdd={handleOpenAdd}
          onEdit={handleOpenEdit}
          onDelete={handleOpenDelete}
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