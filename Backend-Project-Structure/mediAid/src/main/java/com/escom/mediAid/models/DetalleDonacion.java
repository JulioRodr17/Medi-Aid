package com.escom.mediAid.models;

import jakarta.persistence.*;

@Entity
@Table(name = "detalle_donacion")
public class DetalleDonacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_detalle_donacion")
    private Integer id;

    // Relación Many-to-One con Donacion
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_donacion", nullable = false)
    private Donacion donacion;

    // Relación Many-to-One con Medicamento
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_medicamento", nullable = false)
    private Medicamento medicamento;

    @Column(name = "cantidad_ofrecida", nullable = false)
    private Integer cantidadOfrecida;

    @Column(length = 100)
    private String lote;

    @Column(name = "fecha_caducidad_lote")
    private java.time.LocalDate fechaCaducidadLote;

    // --- Constructores ---
    public DetalleDonacion() {
    }

    // --- Getters y Setters ---
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Donacion getDonacion() {
        return donacion;
    }

    public void setDonacion(Donacion donacion) {
        this.donacion = donacion;
    }

    public Medicamento getMedicamento() {
        return medicamento;
    }

    public void setMedicamento(Medicamento medicamento) {
        this.medicamento = medicamento;
    }

    public Integer getCantidadOfrecida() {
        return cantidadOfrecida;
    }

    public void setCantidadOfrecida(Integer cantidadOfrecida) {
        this.cantidadOfrecida = cantidadOfrecida;
    }

    public String getLote() {
        return lote;
    }

    public void setLote(String lote) {
        this.lote = lote;
    }

    public java.time.LocalDate getFechaCaducidadLote() {
        return fechaCaducidadLote;
    }

    public void setFechaCaducidadLote(java.time.LocalDate fechaCaducidadLote) {
        this.fechaCaducidadLote = fechaCaducidadLote;
    }
}
