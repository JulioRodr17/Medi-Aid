
import React from 'react';
import './InventoryTable.css';
import Button from '../../../components/ui/button/Button';


const InventoryTable = ({ inventory, onEdit, onDelete, onAdd }) => {
  return (
    <div className="inventory-table-container">
      <div className="table-header">
        <h3 className="table-title">Gestión de Inventario</h3>
        <Button 
          onClick={onAdd}
          variant="primary"
          style={{ backgroundColor: '#3921f2' }} // Tu color
        >
          + Agregar Medicamento
        </Button>
      </div>

      <table className="inventory-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Stock</th>
            <th>Caducidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((med) => (
            <tr key={med.id}>
              <td>
                <span className="med-name">{med.nombreMedicamento}</span>
                <span className="med-dosage">{med.dosis}</span>
              </td>
              <td>{med.categoria.nombreCategoria}</td>
              <td>
                <span className={`stock-level ${med.cantidadStock < med.stockMinimo ? 'low' : ''}`}>
                  {med.cantidadStock}
                </span>
              </td>
              <td>
                {med.fechaCaducidad ? (() => {
                  const hoy = new Date();
                  const fechaCad = new Date(med.fechaCaducidad);
                  const diffTime = fechaCad - hoy; // diferencia en milisegundos
                  const diffDays = diffTime / (1000 * 60 * 60 * 24); // convertir a días
                  return diffDays <= 30 && diffDays >= 0 ? (
                    <span className="expiring-soon">{med.fechaCaducidad}</span>
                  ) : (
                    <span>{med.fechaCaducidad}</span>
                  );
                })() : ( <span>No hay fecha</span> )}
              </td>
              <td className="action-buttons">
                <button className="action-btn edit" onClick={() => onEdit(med)}>
                  Editar
                </button>
                <button className="action-btn delete" onClick={() => onDelete(med)}>
                  Borrar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;