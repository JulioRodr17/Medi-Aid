package com.escom.mediAid.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "usuarios")
public class Usuario {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
    // --- Relación Many-to-One con Rol ---
    @ManyToOne(fetch = FetchType.EAGER) // carga inmediata del rol
    @JoinColumn(name = "id_rol", nullable = false)
    private Rol rol;

	@Column(nullable = false, length = 100)
	private String nombre;

	@Column(name = "apellido_paterno", nullable = false, length = 100)
	private String apellidoPaterno;

	@Column(name = "apellido_materno", length = 100)
	private String apellidoMaterno;

	@Column(nullable = false, unique = true, length = 20)
	private String boleta;

	@Column(nullable = false, unique = true, length = 150)
	private String correo;

	@Column(nullable = false, length = 255)
	private String contrasena;
	
    @Column(length = 20)
    private String telefono;

	@Column(name = "fecha_creacion")
	private LocalDateTime fechaCreacion = LocalDateTime.now();

    @Column(length = 255)
    private String foto;
	
	public Usuario() {
	}

	// --- Getters y Setters ---
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
	
	public Rol getRol() {
	    return rol;
	}

	public void setRol(Rol rol) {
	    this.rol = rol;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getApellidoPaterno() {
		return apellidoPaterno;
	}

	public void setApellidoPaterno(String apellidoPaterno) {
		this.apellidoPaterno = apellidoPaterno;
	}

	public String getApellidoMaterno() {
		return apellidoMaterno;
	}

	public void setApellidoMaterno(String apellidoMaterno) {
		this.apellidoMaterno = apellidoMaterno;
	}

	public String getBoleta() {
		return boleta;
	}

	public void setBoleta(String boleta) {
		this.boleta = boleta;
	}

	public String getCorreo() {
		return correo;
	}

	public void setCorreo(String correo) {
		this.correo = correo;
	}

	public String getContrasena() {
		return contrasena;
	}

	public void setContrasena(String contrasena) {
		this.contrasena = contrasena;
	}
	
	public String getTelefono() {
		return telefono;
	}

	public void setTelefono(String telefono) {
		this.telefono = telefono;
	}

	public LocalDateTime getFechaCreacion() {
		return fechaCreacion;
	}

	public void setFechaCreacion(LocalDateTime fechaCreacion) {
		this.fechaCreacion = fechaCreacion;
	}
	
	public String getFoto() {
		return foto;
	}

	public void setFoto(String foto) {
		this.foto = foto;
	}
}
