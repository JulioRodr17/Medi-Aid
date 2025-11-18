package com.escom.mediAid.dtos;

public class UsuarioDTO {
    private String nombre;
    private String apellidoPaterno;
    private String apellidoMaterno;
    private String boleta;
    private String correo;
    private String contrasena;
    private String telefono;
    private String rol;
    private String foto;

    // Getters y Setters
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public String getApellidoPaterno() { return apellidoPaterno; }
    public void setApellidoPaterno(String apellidoPaterno) { this.apellidoPaterno = apellidoPaterno; }
    public String getApellidoMaterno() { return apellidoMaterno; }
    public void setApellidoMaterno(String apellidoMaterno) { this.apellidoMaterno = apellidoMaterno; }
    public String getBoleta() { return boleta; }
    public void setBoleta(String boleta) { this.boleta = boleta; }
    public String getCorreo() { return correo; }
    public void setCorreo(String correo) { this.correo = correo; }
    public String getContrasena() { return contrasena; }
    public void setContrasena(String contrasena) { this.contrasena = contrasena; }
    public String getTelefono() { return telefono; }
    public void setTelefono(String telefono) { this.telefono = telefono; }
    public String getRol() { return rol; }
    public void setRol(String rol) { this.rol = rol; }
    public String getFoto() { return foto; }
    public void setFoto(String foto) { this.foto = foto; }
}
