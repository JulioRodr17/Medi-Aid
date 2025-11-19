package com.escom.mediAid.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.escom.mediAid.dtos.LoginDTO;
import com.escom.mediAid.dtos.UsuarioDTO;
import com.escom.mediAid.models.Usuario;
import com.escom.mediAid.services.UsuarioService;

import java.util.List;
import java.util.Map;

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
	public ResponseEntity<Map<String, Object>> registrar(@RequestBody UsuarioDTO usuarioDTO) {
	    try {
	        Map<String, Object> userData = service.registrar(usuarioDTO);
	        return ResponseEntity.status(HttpStatus.CREATED).body(userData);
	    } catch (IllegalArgumentException e) {
	        return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
	    } catch (Exception e) {
	        return ResponseEntity.internalServerError().body(Map.of("error", "Ocurrió un error al registrar el usuario"));
	    }
	}

	// ==================================================  ==================================================
	@PostMapping("/login")
	public ResponseEntity<Map<String, Object>> login(@RequestBody LoginDTO loginDTO) {
	    try {
	        Map<String, Object> userData = service.login(loginDTO);
	        return ResponseEntity.ok(userData);
	    } catch (IllegalArgumentException e) {
	        return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
	    } catch (Exception e) {
	        return ResponseEntity.internalServerError().body(Map.of("error", "Error al iniciar sesión"));
	    }
	}
}
