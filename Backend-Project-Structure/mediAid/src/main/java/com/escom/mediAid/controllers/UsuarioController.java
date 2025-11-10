package com.escom.mediAid.controllers;

import com.escom.mediAid.dtos.LoginDTO;
import com.escom.mediAid.dtos.UsuarioDTO;
import com.escom.mediAid.models.Usuario;
import com.escom.mediAid.services.UsuarioService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {
	private final UsuarioService service;

	public UsuarioController(UsuarioService service) {
		this.service = service;
	}
	// ================================================== Listar usuarios ==================================================
	@GetMapping
	public List<Usuario> listar() {
		return service.listar();
	}
	// ================================================== Registrar un usuario ==================================================
	@PostMapping("/registro")
	public ResponseEntity<String> registrar(@RequestBody UsuarioDTO usuarioDTO) {
		System.out.println("Llegó petición de registro: " + usuarioDTO);
	    try {
	        service.registrar(usuarioDTO);
	        return ResponseEntity.status(HttpStatus.CREATED)
	                             .body("Usuario registrado correctamente");
	    } catch (IllegalArgumentException e) {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
	                             .body(e.getMessage());
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                             .body("Ocurrió un error al registrar el usuario");
	    }
	}
	// ==================================================  ==================================================
	@PostMapping("/login")
	public ResponseEntity<String> login(@RequestBody LoginDTO loginDTO) {
	    try {
	        String token = service.login(loginDTO);
	        return ResponseEntity.ok(token);
	    } catch (IllegalArgumentException e) {
	        return ResponseEntity.badRequest().body(e.getMessage());
	    } catch (Exception e) {
	        return ResponseEntity.internalServerError().body("Error al iniciar sesión");
	    }
	}



}
