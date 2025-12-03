import React from 'react';
import './InventoryTable.css';
import Button from '../../../components/ui/button/Button';

const InventoryTable = ({
  inventory,
  onEdit,
  onDelete,
  onAdd,
  onSortChange,
  currentSortBy,
  currentSortDirection
}) => {

  const renderArrow = (field) => {
    if (currentSortBy !== field) return "↕";
    return currentSortDirection === "ASC" ? "↑" : "↓";
  };

  return (
    <div className="inventory-table-container">
      <div className="table-header">
        <h3 className="table-title">Gestión de Inventario</h3>
        <Button 
          onClick={onAdd}
          variant="primary"
          style={{ backgroundColor: '#3921f2' }}
        >
          + Agregar Medicamento
        </Button>
      </div>

      <table className="inventory-table">
        <thead>
          <tr>
            <th onClick={() => onSortChange("nombreMedicamento")} style={{ cursor: 'pointer' }}>
              Nombre {renderArrow("nombreMedicamento")}
            </th>

            <th onClick={() => onSortChange("categoria")} style={{ cursor: 'pointer' }}>
              Categoría {renderArrow("categoria")}
            </th>

            <th onClick={() => onSortChange("cantidadStock")} style={{ cursor: 'pointer' }}>
              Stock {renderArrow("cantidadStock")}
            </th>

            <th onClick={() => onSortChange("fechaCaducidad")} style={{ cursor: 'pointer' }}>
              Caducidad {renderArrow("fechaCaducidad")}
            </th>

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

              <td>{med.categoria?.nombreCategoria}</td>

              <td>
                <span className={`stock-level ${med.cantidadStock < med.stockMinimo ? 'low' : ''}`}>
                  {med.cantidadStock}
                </span>
              </td>

              <td>
                {med.fechaCaducidad ? (() => {
                  // Fecha actual sin horas
                  const hoy = new Date();
                  hoy.setHours(0, 0, 0, 0);

                  // Parseo manual de YYYY-MM-DD para evitar problema de zona horaria
                  const [y, m, d] = med.fechaCaducidad.split('-');
                  const fechaCad = new Date(y, m - 1, d);
                  fechaCad.setHours(0, 0, 0, 0);

                  const diffTime = fechaCad - hoy;
                  const diffDays = diffTime / (1000 * 60 * 60 * 24);

                  return diffDays <= 30 && diffDays >= 0 ? (
                    <span className="expiring-soon">
                      {fechaCad.toLocaleDateString()}
                    </span>
                  ) : (
                    <span>
                      {fechaCad.toLocaleDateString()}
                    </span>
                  );
                })() : <span>No hay fecha</span>}
              </td>

              <td className="action-buttons">
                <button 
                  className="action-btn edit" 
                  onClick={() => onEdit(med)}
                >
                  Editar
                </button>

                <button 
                  className="action-btn delete" 
                  onClick={() => onDelete(med)}
                >
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
