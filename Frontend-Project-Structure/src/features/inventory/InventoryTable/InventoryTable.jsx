
import React from 'react';
import './InventoryTable.css';
import Button from '../../../components/ui/button/Button';
import EmptyState from '../../../components/ui/EmptyState/EmptyState';


const InventoryTable = ({ inventory, onEdit, onDelete, onAdd, onToggleScarce, togglingId, scarceMessage, scarceCount = 0, scarceLimit = 5 }) => {
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

      {scarceMessage && (
        <p className="inventory-inline-error">
          {scarceMessage}
        </p>
      )}

      {inventory.length > 0 && (
        <p className="inventory-scarce-counter">
          Escasos seleccionados: <strong>{scarceCount}</strong> / {scarceLimit}
        </p>
      )}

      {inventory.length === 0 ? (
        <EmptyState
          icon="📦"
          title="No hay medicamentos cargados"
          message="Registra un medicamento para comenzar a gestionar el inventario."
          action={{ label: 'Agregar medicamento', onClick: onAdd }}
        />
      ) : (
        <div className="inventory-table-wrapper">
          <table className="inventory-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Stock</th>
                <th>Caducidad</th>
                <th>Escaso</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((med) => {
                const medId = med.id || med.id_medicamento || med.idMedicamento;
                const stockValue = med.cantidadStock ?? med.stock ?? 0;
                const minStock = med.stockMinimo ?? 0;
                const isScarce = Boolean(med.isScarce);
                const fechaCaducidad = med.fechaCaducidad || med.expirationDate;
                const disableForLimit = scarceCount >= scarceLimit && !isScarce;

                return (
                  <tr key={medId}>
                    <td>
                      <span className="med-name">{med.nombreMedicamento || med.name}</span>
                      <span className="med-dosage">{med.dosis || med.dosage}</span>
                    </td>
                    <td>{med.categoria?.nombreCategoria || med.category || 'N/A'}</td>
                    <td>
                      <span className={`stock-level ${stockValue < minStock ? 'low' : ''}`}>
                        {stockValue}
                      </span>
                    </td>
                    <td>
                      {fechaCaducidad ? (() => {
                        const hoy = new Date();
                        const fechaCad = new Date(fechaCaducidad);
                        const diffDays = (fechaCad - hoy) / (1000 * 60 * 60 * 24);
                        return diffDays <= 30 && diffDays >= 0 ? (
                          <span className="expiring-soon">{fechaCaducidad}</span>
                        ) : (
                          <span>{fechaCaducidad}</span>
                        );
                      })() : ( <span>No hay fecha</span> )}
                    </td>
                    <td>
                      {typeof onToggleScarce === 'function' ? (
                        <label className={`scarce-toggle ${isScarce ? 'active' : ''} ${togglingId === medId ? 'disabled' : ''} ${disableForLimit ? 'locked' : ''}`}>
                          <input
                            type="checkbox"
                            checked={isScarce}
                            onChange={() => onToggleScarce({ ...med, id: medId }, !isScarce)}
                            disabled={togglingId === medId || disableForLimit}
                          />
                          <span>{isScarce ? 'Sí' : 'No'}</span>
                        </label>
                      ) : (
                        <span>{isScarce ? 'Sí' : 'No'}</span>
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
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default InventoryTable;