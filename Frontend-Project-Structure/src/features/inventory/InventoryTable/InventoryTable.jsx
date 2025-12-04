import React from 'react';
import './InventoryTable.css';
import Button from '../../../components/ui/button/Button';

const InventoryTable = ({
  inventory,              // arreglo de medicamentos
  onAdd,                  // función para agregar
  onEdit,                 // función para editar
  onDelete,               // función para borrar
  onSortChange,           // función para ordenar
  currentSortBy,          // campo por el que se está ordenando
  currentSortDirection    // dirección de ordenamiento ('ASC' o 'DESC')
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

            <th></th>
          </tr>
        </thead>

        <tbody>
          {inventory.map((med) => {
            // Determinar si el medicamento está caducado
            let isExpired = false;
            let displayDate = "No hay fecha";
            let diffDays = null;

            if (med.fechaCaducidad) {
              const hoy = new Date();
              hoy.setHours(0, 0, 0, 0);

              const [y, m, d] = med.fechaCaducidad.split('-');
              const fechaCad = new Date(y, m - 1, d);
              fechaCad.setHours(0, 0, 0, 0);

              const diffTime = fechaCad - hoy;
              diffDays = diffTime / (1000 * 60 * 60 * 24);

              if (diffDays < 0) {
                isExpired = true;
                displayDate = "Caducado";
              } else {
                displayDate = fechaCad.toLocaleDateString();
              }
            }

            return (
              <tr key={med.id} onClick={() => onEdit(med)}>
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
                  {displayDate === "Caducado" ? (
                    <span className="expiring-soon">Caducado</span>
                  ) : diffDays <= 30 && diffDays >= 0 ? (
                    <span className="expiring-soon">{displayDate}</span>
                  ) : (
                    <span>{displayDate}</span>
                  )}
                </td>

                <td>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // evita que se dispare onEdit
                      onDelete(med);
                    }}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: 18,
                      color: 'red'
                    }}
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;
