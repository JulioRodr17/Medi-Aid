package com.escom.mediAid.models;

import jakarta.persistence.*;
import java.time.OffsetDateTime;

@Entity
@Table(name = "notificaciones")
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "usuario_id", nullable = false)
    private Long usuarioId;

    @Column(nullable = false)
    private String titulo;

    @Column(columnDefinition = "TEXT")
    private String descripcion;

    @Column(length = 50)
    private String tipo = "INFO";

    @Column
    private String url;

    @Column
    private Boolean leida = false;

    @Column(name = "fecha_lectura")
    private OffsetDateTime fechaLectura;

    @Column(name = "fecha_registro", insertable = false, updatable = false)
    private OffsetDateTime fechaRegistro;

    @Column
    private Boolean activo = true;

    // Getters and setters ...

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public Long getUsuarioId() { return usuarioId; }

    public void setUsuarioId(Long usuarioId) { this.usuarioId = usuarioId; }

    public String getTitulo() { return titulo; }

    public void setTitulo(String titulo) { this.titulo = titulo; }

    public String getDescripcion() { return descripcion; }

    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }

    public String getTipo() { return tipo; }

    public void setTipo(String tipo) { this.tipo = tipo; }

    public String getUrl() { return url; }

    public void setUrl(String url) { this.url = url; }

    public Boolean getLeida() { return leida; }

    public void setLeida(Boolean leida) { this.leida = leida; }

    public OffsetDateTime getFechaLectura() { return fechaLectura; }

    public void setFechaLectura(OffsetDateTime fechaLectura) { this.fechaLectura = fechaLectura; }

    public OffsetDateTime getFechaRegistro() { return fechaRegistro; }

    public Boolean getActivo() { return activo; }

    public void setActivo(Boolean activo) { this.activo = activo; }

}
