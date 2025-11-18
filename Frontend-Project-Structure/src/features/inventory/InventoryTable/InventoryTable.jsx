
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
                <span className="med-name">{med.name}</span>
                <span className="med-dosage">{med.dosage}</span>
              </td>
              <td>{med.category}</td>
              <td>
                <span className={`stock-level ${med.stock < 10 ? 'low' : ''}`}>
                  {med.stock}
                </span>
              </td>
              <td>
                {med.expiringSoon ? (
                  <span className="expiring-soon">Próximo a caducar</span>
                ) : (
                  'En regla'
                )}
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