package com.escom.mediAid.models;

import jakarta.persistence.*;

@Entity
@Table(name = "cat_tipos_movimiento")
public class TipoMovimiento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_tipo_movimiento")
    private Integer id;

    @Column(name = "nombre_movimiento", nullable = false, unique = true, length = 100)
    private String nombreMovimiento;

    @Column(columnDefinition = "TEXT")
    private String descripcion;

    // --- Constructores ---
    public TipoMovimiento() {
    }

    // --- Getters y Setters ---
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNombreMovimiento() {
        return nombreMovimiento;
    }

    public void setNombreMovimiento(String nombreMovimiento) {
        this.nombreMovimiento = nombreMovimiento;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
}
