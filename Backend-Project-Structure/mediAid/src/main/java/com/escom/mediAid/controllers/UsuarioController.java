package com.escom.mediAid.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.escom.mediAid.dtos.LoginDTO;
import com.escom.mediAid.dtos.ResetPasswordDTO;
import com.escom.mediAid.dtos.UsuarioDTO;
import com.escom.mediAid.models.PasswordResetToken;
import com.escom.mediAid.models.Usuario;
import com.escom.mediAid.models.VerificationToken;
import com.escom.mediAid.repositories.PasswordResetTokenRepository;
import com.escom.mediAid.repositories.UsuarioRepository;
import com.escom.mediAid.repositories.VerificationTokenRepository;
import com.escom.mediAid.services.EmailService;
import com.escom.mediAid.services.PasswordResetTokenService;
import com.escom.mediAid.services.UsuarioService;
import com.escom.mediAid.services.VerificationTokenService;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {
	private final UsuarioService service;
	
    private final PasswordResetTokenRepository passwordResetTokenRepo;
    private final PasswordResetTokenService passwordResetTokenService;    
    private final UsuarioRepository usuarioRepo;
    private final EmailService emailService;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    
	public UsuarioController(UsuarioService service, UsuarioRepository usuarioRepo, EmailService emailService, PasswordResetTokenRepository passwordResetTokenRepo, PasswordResetTokenService passwordResetTokenService) {
		this.service = service;
    	this.emailService = emailService;
    	this.usuarioRepo = usuarioRepo;
    	this.passwordResetTokenRepo = passwordResetTokenRepo;
    	this.passwordResetTokenService = passwordResetTokenService;
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
	
	// ==================================================  ==================================================
	@PostMapping("/forgot-password")
	public ResponseEntity<Map<String, Object>> forgotPass(@RequestBody LoginDTO loginDTO) {
	    try {
	        Map<String, Object> msg = service.forgotPass(loginDTO.getCorreo());
	        return ResponseEntity.ok(msg);
	    } catch (IllegalArgumentException e) {
	        return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
	    } catch (Exception e) {
	        return ResponseEntity.internalServerError().body(Map.of("error", "Error al iniciar sesión"));
	    }
	}

	// ==================================================  ==================================================
	@PostMapping("/reset-password")
	public ResponseEntity<String> resetPassword(@RequestBody ResetPasswordDTO resetPassword) {

	    // Obtenemos token y nueva contraseña del DTO
	    String token = resetPassword.getToken();
	    String nuevaPassword = resetPassword.getContrasena();

	    // Buscar el token en la base de datos
	    Optional<PasswordResetToken> optPrt = passwordResetTokenRepo.findByToken(token);

	    if (optPrt.isEmpty()) {
	        return ResponseEntity.badRequest().body("Token inválido");
	    }

	    PasswordResetToken prt = optPrt.get();

	    // Verificar si el token ha expirado
	    if (prt.isExpired()) {
	        return ResponseEntity.badRequest().body("El token ha expirado");
	    }

	    // Si todo es válido, actualizar la contraseña del usuario
	    Usuario usuario = prt.getUsuario();
	    String hashedPassword = passwordEncoder.encode(nuevaPassword);
	    usuario.setContrasena(hashedPassword);
	    usuarioRepo.save(usuario);

	    // Opcional: eliminar el token después de usarlo
	    passwordResetTokenRepo.delete(prt);

	    return ResponseEntity.ok("Contraseña restablecida correctamente");
	}
    
}
