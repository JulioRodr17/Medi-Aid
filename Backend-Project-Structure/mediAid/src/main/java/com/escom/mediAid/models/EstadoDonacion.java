package com.escom.mediAid.models;

import jakarta.persistence.*;

@Entity
@Table(name = "cat_estados_donacion")
public class EstadoDonacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_estado_donacion")
    private Integer id;

    @Column(name = "nombre_estado", nullable = false, length = 50, unique = true)
    private String nombreEstado;

    // --- Constructores ---
    public EstadoDonacion() {
    }

    // --- Getters y Setters ---
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNombreEstado() {
        return nombreEstado;
    }

    public void setNombreEstado(String nombreEstado) {
        this.nombreEstado = nombreEstado;
    }
}
