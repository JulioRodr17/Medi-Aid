package com.escom.mediAid.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "movimientos_medicamentos")
public class MovimientoMedicamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_movimiento")  // coincide con tu tabla
    private Integer id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_medicamento", nullable = false)
    private Medicamento medicamento;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_tipo_movimiento", nullable = false)
    private TipoMovimiento tipoMovimiento;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_usuario_registra", nullable = false)
    private Usuario usuarioRegistra;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_detalle_donacion")  // opcional
    private DetalleDonacion detalleDonacion;

    @Column(nullable = false)
    private Integer cantidad;

    @Column(columnDefinition = "TEXT")
    private String motivoAjuste;

    @Column(name = "fecha_movimiento", nullable = false, updatable = false,
            columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime fechaMovimiento;

    public MovimientoMedicamento() {}

    // --- Getters y Setters ---
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public Medicamento getMedicamento() { return medicamento; }
    public void setMedicamento(Medicamento medicamento) { this.medicamento = medicamento; }

    public TipoMovimiento getTipoMovimiento() { return tipoMovimiento; }
    public void setTipoMovimiento(TipoMovimiento tipoMovimiento) { this.tipoMovimiento = tipoMovimiento; }

    public Usuario getUsuarioRegistra() { return usuarioRegistra; }
    public void setUsuarioRegistra(Usuario usuarioRegistra) { this.usuarioRegistra = usuarioRegistra; }

    public DetalleDonacion getDetalleDonacion() { return detalleDonacion; }
    public void setDetalleDonacion(DetalleDonacion detalleDonacion) { this.detalleDonacion = detalleDonacion; }

    public Integer getCantidad() { return cantidad; }
    public void setCantidad(Integer cantidad) { this.cantidad = cantidad; }

    public String getMotivoAjuste() { return motivoAjuste; }
    public void setMotivoAjuste(String motivoAjuste) { this.motivoAjuste = motivoAjuste; }

    public LocalDateTime getFechaMovimiento() { return fechaMovimiento; }
    public void setFechaMovimiento(LocalDateTime fechaMovimiento) { this.fechaMovimiento = fechaMovimiento; }
}
