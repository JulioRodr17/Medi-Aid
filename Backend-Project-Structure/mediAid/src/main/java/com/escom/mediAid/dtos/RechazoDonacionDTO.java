package com.escom.mediAid.dtos;


public class RechazoDonacionDTO {	
    private String estadoDonacion; // Ej: "RECHAZADA"
    private Integer idDetalleDonacion;
    private Long idUsuarioAprueba;
    private String motivoRechazo;

    // Getters y Setters
    public String getEstadoDonacion() { return estadoDonacion; }
    public void setEstadoDonacion(String estadoDonacion) { this.estadoDonacion = estadoDonacion; }

    public Integer getIdDetalleDonacion() { return idDetalleDonacion; }
    public void setIdDetalleDonacion(Integer idDetalleDonacion) { this.idDetalleDonacion = idDetalleDonacion; }

    public Long getIdUsuarioAprueba() { return idUsuarioAprueba; }
    public void setIdUsuarioAprueba(Long idUsuarioAprueba) { this.idUsuarioAprueba = idUsuarioAprueba; }

    public String getMotivoRechazo() { return motivoRechazo; }
    public void setMotivoRechazo(String motivoRechazo) { this.motivoRechazo = motivoRechazo; }
}
