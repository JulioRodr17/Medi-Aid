package com.escom.mediAid.models;

import jakarta.persistence.*;

@Entity
@Table(name = "cat_roles")
public class Rol {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_rol")
    private Integer id;

    @Column(name = "nombre_rol", nullable = false, unique = true, length = 50)
    private String nombreRol;
    
    @Column(nullable = false)
    private Boolean admin = false;

    // Getters y Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNombreRol() {
        return nombreRol;
    }

    public void setNombreRol(String nombreRol) {
        this.nombreRol = nombreRol;
    }
    
    public Boolean getAdmin() { 
    	return admin; 
    }
    public void setAdmin(Boolean admin) { 
    	this.admin = admin; 
    }
}
