package com.escom.mediAid.dtos;

import java.time.LocalDate;

import com.escom.mediAid.models.Categoria;

public class MedicamentoDTO {

    private Integer id;
    private String nombreMedicamento;
    private Categoria categoria;    // Solo guardamos el ID de la categoría
    private String descripcion;
    private String presentacion;
    private String dosis;
    private Integer cantidadStock;
    private Integer stockMinimo;
    private LocalDate fechaCaducidad;  // String para evitar problemas de deserialización
    private String uso;
    private Boolean activo;
    private String url;             // URL de la imagen, si existe

    // Constructor vacío
    public MedicamentoDTO() {}

    // Constructor con todos los campos
    public MedicamentoDTO(Integer id, String nombreMedicamento, Categoria categoria,
                          String descripcion, String presentacion, String dosis,
                          Integer cantidadStock, Integer stockMinimo, LocalDate fechaCaducidad,
                          String uso, Boolean activo, String url) {
        this.id = id;
        this.nombreMedicamento = nombreMedicamento;
        this.categoria = categoria;
        this.descripcion = descripcion;
        this.presentacion = presentacion;
        this.dosis = dosis;
        this.cantidadStock = cantidadStock;
        this.stockMinimo = stockMinimo;
        this.fechaCaducidad = fechaCaducidad;
        this.uso = uso;
        this.activo = activo;
        this.url = url;
    }

    // --- Getters y Setters ---

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNombreMedicamento() {
        return nombreMedicamento;
    }

    public void setNombreMedicamento(String nombreMedicamento) {
        this.nombreMedicamento = nombreMedicamento;
    }

    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoriaId(Categoria categoria) {
        this.categoria = categoria;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
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

    public Integer getCantidadStock() {
        return cantidadStock;
    }

    public void setCantidadStock(Integer cantidadStock) {
        this.cantidadStock = cantidadStock;
    }

    public Integer getStockMinimo() {
        return stockMinimo;
    }

    public void setStockMinimo(Integer stockMinimo) {
        this.stockMinimo = stockMinimo;
    }

    public LocalDate getFechaCaducidad() {
        return fechaCaducidad;
    }

    public void setFechaCaducidad(LocalDate fechaCaducidad) {
        this.fechaCaducidad = fechaCaducidad;
    }

    public String getUso() {
        return uso;
    }

    public void setUso(String uso) {
        this.uso = uso;
    }

    public Boolean getActivo() {
        return activo;
    }

    public void setActivo(Boolean activo) {
        this.activo = activo;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
