import React, { useState, useEffect } from 'react';
import './InventoryPage.css';
import { medicationService } from '../../services/medicationService';
import InventoryStats from '../../features/inventory/InventoryStats/InventoryStats';
import InventoryTable from '../../features/inventory/InventoryTable/InventoryTable';

import Modal from '../../components/ui/Modal/Modal';
import MedicationForm from '../../features/inventory/MedicationForm/MedicationForm';
import DeleteWarningModal from '../../features/inventory/DeleteWarningModal/DeleteWarningModal';

const InventoryPage = () => {
  // -------- ESTADOS DE DATOS ----------
  const [stats, setStats] = useState(null);
  const [inventory, setInventory] = useState([]);

  // -------- ESTADOS DE ORDEN ----------
  const [sortBy, setSortBy] = useState("fechaCaducidad");
  const [sortDirection, setSortDirection] = useState("ASC");

  // -------- ESTADOS UI ----------
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // -------- ESTADOS MODALES ----------
  const [isAddOrEditModalOpen, setIsAddOrEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedMedication, setSelectedMedication] = useState(null);

  // -------- CARGA DE DATOS ----------
  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      const inventoryData = await medicationService.getMedWithPhoto({
        size: 0,
        sortBy,
        sortDirection
      });

      const statsData = summarizeMedicamentos(inventoryData.data);

      setInventory(inventoryData.data);
      setStats(statsData);

    } catch (err) {
      console.error("Error al cargar inventario:", err);
      setError(err.message || 'No se pudieron cargar los datos.');
    } finally {
      setLoading(false);
    }
  };

  // -------- RESUMEN DE STATS ----------
  function summarizeMedicamentos(medicamentos) {
    const hoy = new Date();
    const proximos30Dias = 30 * 24 * 60 * 60 * 1000;

    let totalMeds = 0;
    const nombreMedicamentosSet = new Set();
    let expiringSoon = 0;
    const scarceMedsSet = new Set();

    medicamentos.forEach(med => {
      totalMeds += med.cantidadStock;
      nombreMedicamentosSet.add(med.nombreMedicamento);

      if (med.fechaCaducidad) {
        const fechaCad = new Date(med.fechaCaducidad);
        const diffTime = fechaCad - hoy;

        if (diffTime >= 0 && diffTime <= proximos30Dias) {
          expiringSoon += med.cantidadStock;
        }
      }

      if (med.cantidadStock <= med.stockMinimo) {
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

  // -------- CUANDO CAMBIA EL ORDEN O SE MONTA ----------
  useEffect(() => {
    loadData();
  }, [sortBy, sortDirection]);

  // -------- MANEJO DE ORDEN DESDE HIJO ----------
  const handleSortChange = (field) => {
    if (field === sortBy) {
      setSortDirection(prev => prev === "ASC" ? "DESC" : "ASC");
    } else {
      setSortBy(field);
      setSortDirection("ASC");
    }
  };

  // -------- MODALES ----------
  const handleOpenAdd = () => {
    setSelectedMedication(null);
    setIsAddOrEditModalOpen(true);
  };

  const handleOpenEdit = (med) => {
    setSelectedMedication(med);
    setIsAddOrEditModalOpen(true);
  };

  const handleOpenDelete = (med) => {
    setSelectedMedication(med);
    setIsDeleteModalOpen(true);
  };

  const handleCloseModals = () => {
    setIsAddOrEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setSelectedMedication(null);
  };

  // -------- CRUD ----------
  const handleSave = async (formData) => {
    try {
      if (selectedMedication) {
        await medicationService.updateMedication(formData);
      } else {
        await medicationService.addMedication(formData);
      }

      handleCloseModals();
      loadData();

    } catch (err) {
      console.error('Error al guardar:', err);
      throw err;
    }
  };

  const handleDelete = async () => {
    if (!selectedMedication) return;

    try {
      await medicationService.deleteMedication(selectedMedication.id);
      handleCloseModals();
      loadData();

    } catch (err) {
      console.error('Error al borrar:', err);
    }
  };

  if (error) {
    return <div className="page-error">Error al cargar: {error}</div>;
  }

  return (
    <>
      <div className="inventory-page">
        <h1 className="page-title">Inventario</h1>

        <InventoryStats stats={stats} />

        {loading && !stats ? (
          <p>Cargando inventario...</p>
        ) : (
          <InventoryTable
            inventory={inventory}
            onAdd={handleOpenAdd}
            onEdit={handleOpenEdit}
            onDelete={handleOpenDelete}
            onSortChange={handleSortChange}
            currentSortBy={sortBy}
            currentSortDirection={sortDirection}
          />
        )}
      </div>

      <Modal
        title={selectedMedication ? 'Editar Medicamento' : 'Agregar Medicamento'}
        isOpen={isAddOrEditModalOpen}
        onClose={handleCloseModals}
      >
        <MedicationForm
          medication={selectedMedication}
          onSave={handleSave}
          onCancel={handleCloseModals}
        />
      </Modal>

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
