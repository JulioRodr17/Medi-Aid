package com.escom.mediAid.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "donaciones")
public class Donacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_donacion")
    private Integer id;

    // Relación Many-to-One con Usuario (donante)
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_usuario_donante", nullable = false)
    private Usuario usuarioDonante;

    // Relación Many-to-One con Usuario (aprueba)
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_usuario_aprueba")
    private Usuario usuarioAprueba;

    // Relación Many-to-One con cat_estados_donacion
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_estado_donacion", nullable = false)
    private EstadoDonacion estadoDonacion;

    @Column(columnDefinition = "TEXT")
    private String motivoRechazo;

    @Column(name = "fecha_registro", nullable = false, updatable = false)
    private LocalDateTime fechaRegistro = LocalDateTime.now();

    @Column(name = "fecha_resolucion")
    private LocalDateTime fechaResolucion;

    // --- Constructores ---
    public Donacion() {
    }

    // --- Getters y Setters ---
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Usuario getUsuarioDonante() {
        return usuarioDonante;
    }

    public void setUsuarioDonante(Usuario usuarioDonante) {
        this.usuarioDonante = usuarioDonante;
    }

    public Usuario getUsuarioAprueba() {
        return usuarioAprueba;
    }

    public void setUsuarioAprueba(Usuario usuarioAprueba) {
        this.usuarioAprueba = usuarioAprueba;
    }

    public EstadoDonacion getEstadoDonacion() {
        return estadoDonacion;
    }

    public void setEstadoDonacion(EstadoDonacion estadoDonacion) {
        this.estadoDonacion = estadoDonacion;
    }

    public String getMotivoRechazo() {
        return motivoRechazo;
    }

    public void setMotivoRechazo(String motivoRechazo) {
        this.motivoRechazo = motivoRechazo;
    }

    public LocalDateTime getFechaRegistro() {
        return fechaRegistro;
    }

    public void setFechaRegistro(LocalDateTime fechaRegistro) {
        this.fechaRegistro = fechaRegistro;
    }

    public LocalDateTime getFechaResolucion() {
        return fechaResolucion;
    }

    public void setFechaResolucion(LocalDateTime fechaResolucion) {
        this.fechaResolucion = fechaResolucion;
    }
}
