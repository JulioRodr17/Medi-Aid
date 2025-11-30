package com.escom.mediAid.dtos;

public class NoticiaDTO {

    private Integer id;
    private String titulo;
    private String descripcion;
    private String fechaInicio;      // Puedes usar LocalDate si quieres
    private String fechaExpiracion;  // o LocalDate
    private Boolean activo;
    private Integer orden;

    // Constructor vacío
    public NoticiaDTO() {
    }

    // Constructor con todos los campos
    public NoticiaDTO(Integer id, String titulo, String descripcion,
                      String fechaInicio, String fechaExpiracion,
                      Boolean activo, Integer orden) {
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.fechaInicio = fechaInicio;
        this.fechaExpiracion = fechaExpiracion;
        this.activo = activo;
        this.orden = orden;
    }

    // Getters y Setters

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(String fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public String getFechaExpiracion() {
        return fechaExpiracion;
    }

    public void setFechaExpiracion(String fechaExpiracion) {
        this.fechaExpiracion = fechaExpiracion;
    }

    public Boolean getActivo() {
        return activo;
    }

    public void setActivo(Boolean activo) {
        this.activo = activo;
    }

    public Integer getOrden() {
        return orden;
    }

    public void setOrden(Integer orden) {
        this.orden = orden;
    }
}
