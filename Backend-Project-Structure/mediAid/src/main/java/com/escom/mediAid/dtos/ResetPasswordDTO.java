package com.escom.mediAid.dtos;

public class ResetPasswordDTO {
    private String token;
    private String contrasena;

    // Getters y Setters
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
    public String getContrasena() { return contrasena; }
    public void setContrasena(String contrasena) { this.contrasena = contrasena; }
}
