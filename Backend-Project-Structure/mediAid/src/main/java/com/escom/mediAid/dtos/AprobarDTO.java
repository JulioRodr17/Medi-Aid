package com.escom.mediAid.dtos;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDateTime;

public class AprobarDTO {

    private String estadoDonacion;
    private Integer idDetalleDonacion;
    private Long idUsuarioAprueba;
    private MedicamentoDTO medicamento;

    // Getters y Setters
    public String getEstadoDonacion() {
        return estadoDonacion;
    }

    public void setEstadoDonacion(String estadoDonacion) {
        this.estadoDonacion = estadoDonacion;
    }

    public Integer getIdDetalleDonacion() {
        return idDetalleDonacion;
    }

    public void setIdDetalleDonacion(Integer idDetalleDonacion) {
        this.idDetalleDonacion = idDetalleDonacion;
    }

    public Long getIdUsuarioAprueba() {
        return idUsuarioAprueba;
    }

    public void setIdUsuarioAprueba(Long idUsuarioAprueba) {
        this.idUsuarioAprueba = idUsuarioAprueba;
    }

    public MedicamentoDTO getMedicamento() {
        return medicamento;
    }

    public void setMedicamento(MedicamentoDTO medicamento) {
        this.medicamento = medicamento;
    }
}
