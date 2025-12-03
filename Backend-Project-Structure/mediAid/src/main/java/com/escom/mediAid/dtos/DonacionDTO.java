package com.escom.mediAid.dtos;

public class DonacionDTO {
    private String nombre;
    private String otroNombre;
    private String presentacion;
    private String dosis;
    private Integer cantidadNumerica;
    private String lote;
    private String caducidad; // YYYY-MM-DD
    private Long userId;    // id del usuario que dona


    // Constructor vacío
    public DonacionDTO() {}

    // Constructor con todos los campos
    public DonacionDTO(String nombre, String otroNombre, String presentacion, String dosis,
                       Integer cantidadNumerica, String lote, String caducidad, Long userId) {
        this.nombre = nombre;
        this.otroNombre = otroNombre;
        this.presentacion = presentacion;
        this.dosis = dosis;
        this.cantidadNumerica = cantidadNumerica;
        this.lote = lote;
        this.caducidad = caducidad;
        this.userId = userId;
    }

    // --- Getters y Setters ---
    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getOtroNombre() {
        return otroNombre;
    }

    public void setOtroNombre(String otroNombre) {
        this.otroNombre = otroNombre;
    }

    public String getPresentacion() {
        return presentacion;
    }

    public void setPresentacion(String presentacion) {
        this.presentacion = presentacion;
    }

    public String getDosis() {
        return dosis;
    }

    public void setDosis(String dosis) {
        this.dosis = dosis;
    }

    public Integer getCantidadNumerica() {
        return cantidadNumerica;
    }

    public void setCantidadNumerica(Integer cantidadNumerica) {
        this.cantidadNumerica = cantidadNumerica;
    }

    public String getLote() {
        return lote;
    }

    public void setLote(String lote) {
        this.lote = lote;
    }

    public String getCaducidad() {
        return caducidad;
    }

    public void setCaducidad(String caducidad) {
        this.caducidad = caducidad;
    }
    
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
