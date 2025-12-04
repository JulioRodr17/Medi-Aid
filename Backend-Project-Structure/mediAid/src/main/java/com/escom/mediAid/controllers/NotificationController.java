package com.escom.mediAid.controllers;

import com.escom.mediAid.dtos.NotificationDTO;
import com.escom.mediAid.models.Notificacion;
import com.escom.mediAid.models.Rol;
import com.escom.mediAid.models.Usuario;
import com.escom.mediAid.repositories.NotificationRepository;
import com.escom.mediAid.repositories.RolRepository;
import com.escom.mediAid.repositories.UsuarioRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import jakarta.transaction.Transactional;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

	private final NotificationRepository notificationRepository;
	private final UsuarioRepository usuarioRepository;
	private final RolRepository rolRepository;

	
    public NotificationController(NotificationRepository notificacionRepository, UsuarioRepository usuarioRepository, RolRepository rolRepository) {
        this.notificationRepository = notificacionRepository;
        this.usuarioRepository = usuarioRepository;
        this.rolRepository = rolRepository;
    }

    // ==================================================
    @PostMapping("/nueva")
    @PreAuthorize("isAuthenticated()")
    @Transactional
    public ResponseEntity<?> agregarNotificacion(@RequestBody NotificationDTO notificationDTO) {

        if (notificationDTO.getTitulo() == null) {
            return ResponseEntity.badRequest().body("titulo es obligatorio");
        }

        // Caso 1: idUsuario especificado
        if (notificationDTO.getUsuarioId() != null) {
            Notificacion notificacion = new Notificacion();
            notificacion.setUsuarioId(notificationDTO.getUsuarioId());
            notificacion.setTitulo(notificationDTO.getTitulo());
            notificacion.setDescripcion(notificationDTO.getDescripcion());
            notificacion.setTipo(
                    notificationDTO.getTipo() != null ? notificationDTO.getTipo() : "INFO"
            );
            notificacion.setUrl(notificationDTO.getUrl());

            notificationRepository.save(notificacion);

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body("Notificación creada correctamente para el usuario " + notificationDTO.getUsuarioId());
        }

        // Caso 2: idUsuario es null -> enviar a todos los DOCTOR
        Rol rolDoctor = rolRepository.findByNombreRol("DOCTOR")
                .orElse(null);

        if (rolDoctor == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No se encontró el rol DOCTOR");
        }

        List<Usuario> doctores = usuarioRepository.findByRolId(rolDoctor.getId());

        if (doctores.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No hay usuarios con rol DOCTOR");
        }

        for (Usuario doctor : doctores) {
            Notificacion notificacion = new Notificacion();
            notificacion.setUsuarioId(doctor.getId());
            notificacion.setTitulo(notificationDTO.getTitulo());
            notificacion.setDescripcion(notificationDTO.getDescripcion());
            notificacion.setTipo(
                    notificationDTO.getTipo() != null ? notificationDTO.getTipo() : "INFO"
            );
            notificacion.setUrl(notificationDTO.getUrl());

            notificationRepository.save(notificacion);
        }

        return ResponseEntity.status(HttpStatus.CREATED)
                .body("Notificación creada correctamente para " + doctores.size() + " usuarios DOCTOR");
    }

    // ==================================================
    
    @GetMapping("/todas/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> obtenerNotificaciones(@PathVariable Long id) {
        // Buscamos el usuario en la BD
        Usuario usuario = usuarioRepository.findById(id)
                .orElse(null);

        if (usuario == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Usuario no encontrado");
        }

        // Obtenemos todas sus notificaciones
        List<Notificacion> notificaciones = notificationRepository.findByUsuarioIdOrderByFechaRegistroDesc(usuario.getId());

        return ResponseEntity.ok(notificaciones);
    }
    
 // ==================================================
    @PutMapping("/mark-read/{id}")
    @PreAuthorize("isAuthenticated()")
    @Transactional
    public ResponseEntity<?> marcarNotificacionComoLeida(@PathVariable Long id) {
        Notificacion notificacion = notificationRepository.findById(id)
                .orElse(null);
        if (notificacion == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Notificación no encontrada");
        }
        notificacion.setLeida(true);
        notificacion.setFechaLectura(LocalDateTime.now());
        notificationRepository.save(notificacion);
        return ResponseEntity.ok("Notificación marcada como leída");
    }

    @PutMapping("/markAll-read/{usuarioId}")
    @PreAuthorize("isAuthenticated()")
    @Transactional
    public ResponseEntity<?> marcarTodasNotificacionesComoLeidas(@PathVariable Long usuarioId) {
        // Obtenemos todas las notificaciones activas y no leídas del usuario
        List<Notificacion> notificaciones = notificationRepository.findByUsuarioIdAndLeidaFalse(usuarioId);

        if (notificaciones.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No hay notificaciones pendientes para este usuario");
        }

        LocalDateTime ahora = LocalDateTime.now();

        // Marcamos cada una como leída y actualizamos la fecha
        notificaciones.forEach(n -> {
            n.setLeida(true);
            n.setFechaLectura(ahora);
        });

        notificationRepository.saveAll(notificaciones);

        return ResponseEntity.ok("Todas las notificaciones han sido marcadas como leídas");
    }

}
