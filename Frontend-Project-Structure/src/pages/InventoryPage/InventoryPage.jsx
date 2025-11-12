import React from 'react';
import './InventoryPage.css';

const InventoryPage = () => {
  return (
    <div className="inventory-page">
      <h1 className="page-title">Inventario de Medicamentos (Admin)</h1>
      <p>Aquí irá la tabla de gestión de inventario, estadísticas y botones de CRUD.</p>
      {/* TODO: 
          - Añadir <InventoryStats />
          - Añadir <InventoryTable />
          - Añadir Modales de CRUD 
      */}
    </div>
  );
};

export default InventoryPage;