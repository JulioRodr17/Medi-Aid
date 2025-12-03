package com.escom.mediAid.controllers;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.escom.mediAid.dtos.AprobarDTO;
import com.escom.mediAid.dtos.DonacionDTO;
import com.escom.mediAid.dtos.MedicamentoDTO;
import com.escom.mediAid.dtos.RechazoDonacionDTO;
import com.escom.mediAid.models.Categoria;
import com.escom.mediAid.models.DetalleDonacion;
import com.escom.mediAid.models.Donacion;
import com.escom.mediAid.models.EstadoDonacion;
import com.escom.mediAid.models.Medicamento;
import com.escom.mediAid.models.Usuario;
import com.escom.mediAid.repositories.CategoriaRepository;
import com.escom.mediAid.repositories.DetalleDonacionRepository;
import com.escom.mediAid.repositories.DonacionRepository;
import com.escom.mediAid.repositories.EstadoDonacionRepository;
import com.escom.mediAid.repositories.MedicamentoRepository;
import com.escom.mediAid.repositories.UsuarioRepository;
import com.escom.mediAid.services.MedicamentoService;

import jakarta.transaction.Transactional;

@RestController
@RequestMapping("/api/donacion")
public class DonacionController {
    
	
	private final UsuarioRepository usuarioRepository;
	private final CategoriaRepository categoriaRepository;
	private final MedicamentoRepository medicamentoRepository;
	private final EstadoDonacionRepository estadoDonacionRepository;
	private final DonacionRepository donacionRepository;
	private final DetalleDonacionRepository detalleDonacionRepository;
	private final MedicamentoService medicamentoService;
    
    public DonacionController(UsuarioRepository usuarioRepository, CategoriaRepository categoriaRepository, MedicamentoRepository medicamentoRepository, 
    		EstadoDonacionRepository estadoDonacionRepository, DonacionRepository donacionRepository, DetalleDonacionRepository detalleDonacionRepository, MedicamentoService medicamentoService) {
    	this.usuarioRepository = usuarioRepository;
    	this.categoriaRepository = categoriaRepository;
    	this.medicamentoRepository = medicamentoRepository;
    	this.estadoDonacionRepository = estadoDonacionRepository;
    	this.donacionRepository = donacionRepository;
    	this.detalleDonacionRepository = detalleDonacionRepository;
    	this.medicamentoService = medicamentoService;
    }
    // ==================================================  ==================================================
	@PostMapping("/agregar")
    @PreAuthorize("isAuthenticated()")
	@Transactional
	public ResponseEntity<String> agregarDonacion(@RequestBody DonacionDTO donacionDto) {

	    try {
	        // 1️⃣ Obtener usuario donante
	        Usuario donante = usuarioRepository.findById(donacionDto.getUserId())
	                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

	        // 2️⃣ Obtener categoría (siempre 1)
	        Categoria categoria = categoriaRepository.findByNombreCategoria("Otros")
	                .orElseThrow(() -> new RuntimeException("Categoría 'Otros' no encontrada"));

	        // 3️⃣ Determinar nombre final
	        String nombreFinal = donacionDto.getNombre();
	        if ("Otro...".equals(nombreFinal)) {
	            nombreFinal = donacionDto.getOtroNombre();
	        }

	        // 4️⃣ Crear Medicamento
	        Medicamento medicamento = new Medicamento();
	        medicamento.setCategoria(categoria);
	        medicamento.setNombreMedicamento(nombreFinal);
	        medicamento.setPresentacion(donacionDto.getPresentacion());
	        medicamento.setDosis(donacionDto.getDosis());
	        medicamento.setCantidadStock(0);
	        medicamento.setStockMinimo(5);
	        medicamento.setActivo(false);
	        medicamento.setFechaCaducidad(
	                donacionDto.getCaducidad() != null && !donacionDto.getCaducidad().isEmpty() 
	                ? LocalDate.parse(donacionDto.getCaducidad()) : null
	        );
	        medicamentoRepository.save(medicamento);

	        // 5️⃣ Obtener estado de donación = 1
	        EstadoDonacion estado = estadoDonacionRepository.findByNombreEstado("PENDIENTE")
	                .orElseThrow(() -> new RuntimeException("Estado de donación 'PENDIENTE' no encontrado"));


	        // 6️⃣ Crear Donación
	        Donacion donacion = new Donacion();
	        donacion.setUsuarioDonante(donante);
	        donacion.setUsuarioAprueba(null);
	        donacion.setEstadoDonacion(estado);
	        donacion.setMotivoRechazo(null);
	        donacion.setFechaResolucion(null);
	        donacionRepository.save(donacion);

	        // 7️⃣ Crear DetalleDonacion
	        DetalleDonacion detalle = new DetalleDonacion();
	        detalle.setDonacion(donacion);
	        detalle.setMedicamento(medicamento);
	        detalle.setCantidadOfrecida(donacionDto.getCantidadNumerica());
	        detalle.setLote(donacionDto.getLote());
	        detalle.setFechaCaducidadLote(
	                donacionDto.getCaducidad() != null && !donacionDto.getCaducidad().isEmpty() 
	                ? LocalDate.parse(donacionDto.getCaducidad()) : null
	        );
	        detalleDonacionRepository.save(detalle);

	        return ResponseEntity.ok("Donación agregada correctamente");

	    } catch (Exception e) {
	        e.printStackTrace();
	        return ResponseEntity.internalServerError()
	                .body("Error al agregar la donación: " + e.getMessage());
	    }
	}
	
    // ==================================================  ==================================================
	@GetMapping("/historial/{idUsuario}")
	@PreAuthorize("isAuthenticated()")
	public ResponseEntity<?> historialDonacion(@PathVariable Integer idUsuario) {
	    try {
	        List<DetalleDonacion> historial =
	                detalleDonacionRepository.findByDonacion_UsuarioDonante_IdOrderByDonacion_FechaRegistroDesc(idUsuario);

	        if (historial.isEmpty()) {
	            return ResponseEntity.ok("No se encontraron donaciones para este usuario.");
	        }

	        return ResponseEntity.ok(historial);

	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                             .body("Error al obtener el historial de donaciones: " + e.getMessage());
	    }
	}
	
    // ==================================================  ==================================================
	@GetMapping("/stats/{idUsuario}")
	@PreAuthorize("isAuthenticated()")
	public ResponseEntity<?> statsDonacion(@PathVariable Integer idUsuario, Authentication authentication) {
	    try {
	        // Verificamos si el usuario logueado tiene rol DOCTOR
	        boolean isDoctor = authentication.getAuthorities().stream()
	                .anyMatch(auth -> auth.getAuthority().equals("ROLE_DOCTOR"));

	        List<Donacion> donaciones;

	        if (isDoctor) {
	            // Donaciones donde este doctor es el que aprueba (aprobadas/rechazadas)
	            donaciones = donacionRepository.findByUsuarioAprueba_Id(idUsuario);
	        } else {
	            // Donaciones donde este usuario es donante
	            donaciones = donacionRepository.findByUsuarioDonante_Id(idUsuario);
	        }

	        // Conteo global de pendientes solo si es doctor
	        long totalPendientes = 0;
	        if (isDoctor) {
	            totalPendientes = donacionRepository.countByEstadoDonacion_NombreEstadoIgnoreCase("PENDIENTE");
	        }

	        // Si no hay donaciones y no hay pendientes globales
	        if (donaciones.isEmpty() && totalPendientes == 0) {
	            return ResponseEntity.ok(Map.of(
	                "total", 0,
	                "pendiente", 0,
	                "aprobada", 0,
	                "rechazada", 0
	            ));
	        }

	        // Conteo de estados de las donaciones (solo aprobadas/rechazadas del usuario/doctor)
	        Map<String, Long> stats = donaciones.stream()
	            .collect(Collectors.groupingBy(
	                d -> d.getEstadoDonacion().getNombreEstado().toUpperCase(),
	                Collectors.counting()
	            ));

	        long aprobada = stats.getOrDefault("APROBADA", 0L);
	        long rechazada = stats.getOrDefault("RECHAZADA", 0L);

	        // Pendientes
	        long pendiente = isDoctor ? totalPendientes : stats.getOrDefault("PENDIENTE", 0L);

	        // Total
	        long total = (isDoctor ? totalPendientes : stats.getOrDefault("PENDIENTE", 0L)) + aprobada + rechazada;

	        return ResponseEntity.ok(Map.of(
	            "total", total,
	            "pendiente", pendiente,
	            "aprobada", aprobada,
	            "rechazada", rechazada
	        ));

	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                .body("Error al obtener las estadísticas de donaciones: " + e.getMessage());
	    }
	}
	
	
    // ==================================================  ==================================================
	@GetMapping("/pendientes")
	@PreAuthorize("hasRole('DOCTOR') or hasRole('ADMIN')") // o solo isAuthenticated() si prefieres
	public ResponseEntity<?> obtenerDonacionesPendientes() {
	    try {
	        List<DetalleDonacion> pendientes =
	            detalleDonacionRepository
	                .findByDonacion_EstadoDonacion_NombreEstadoOrderByDonacion_FechaRegistroDesc("PENDIENTE");

	        if (pendientes.isEmpty()) {
	            return ResponseEntity.ok("No existen donaciones pendientes por el momento.");
	        }

	        return ResponseEntity.ok(pendientes);

	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                .body("Error al obtener las donaciones pendientes: " + e.getMessage());
	    }
	}
	
    // ==================================================  ==================================================
	@PutMapping("/rechazar")
	@PreAuthorize("hasRole('DOCTOR')")
	public ResponseEntity<String> rechazarDonacion(@RequestBody RechazoDonacionDTO dto) {
	    try {
	        // 1. Buscar detalle de donación
	        Optional<DetalleDonacion> detalleOpt = detalleDonacionRepository.findById(dto.getIdDetalleDonacion());
	        if (detalleOpt.isEmpty()) {
	            return ResponseEntity.badRequest().body("Detalle de donación no encontrado");
	        }

	        DetalleDonacion detalle = detalleOpt.get();
	        Donacion donacion = detalle.getDonacion();
	        if (donacion == null) {
	            return ResponseEntity.badRequest().body("Donación no encontrada");
	        }

	        // 2. Buscar usuario que aprueba
	        Optional<Usuario> usuarioOpt = usuarioRepository.findById(dto.getIdUsuarioAprueba());
	        if (usuarioOpt.isEmpty()) {
	            return ResponseEntity.badRequest().body("Usuario aprobador no encontrado");
	        }

	        // 3. Buscar estado "RECHAZADA"
	        Optional<EstadoDonacion> estadoOpt = estadoDonacionRepository.findByNombreEstado(dto.getEstadoDonacion());
	        if (estadoOpt.isEmpty()) {
	            return ResponseEntity.badRequest().body("Estado de donación inválido");
	        }

	        // 4. Actualizar campos
	        donacion.setEstadoDonacion(estadoOpt.get());
	        donacion.setUsuarioAprueba(usuarioOpt.get());
	        donacion.setMotivoRechazo(dto.getMotivoRechazo());
	        donacion.setFechaResolucion(LocalDateTime.now());

	        // 5. Guardar cambios
	        donacionRepository.save(donacion);

	        return ResponseEntity.ok("Donación rechazada correctamente");

	    } catch (Exception e) {
	        e.printStackTrace();
	        return ResponseEntity.internalServerError().body("Error al rechazar la donación");
	    }
	}
	
	
	@PutMapping("/aprobar")
	@PreAuthorize("hasRole('DOCTOR')")
	public ResponseEntity<String> aprobarDonacion(@RequestBody AprobarDTO dto) {
	    try {
	        // 1. Buscar detalle de donación
	        Optional<DetalleDonacion> detalleOpt = detalleDonacionRepository.findById(dto.getIdDetalleDonacion());
	        if (detalleOpt.isEmpty()) {
	            return ResponseEntity.badRequest().body("Detalle de donación no encontrado");
	        }

	        DetalleDonacion detalle = detalleOpt.get();
	        Donacion donacion = detalle.getDonacion();
	        if (donacion == null) {
	            return ResponseEntity.badRequest().body("Donación no encontrada");
	        }

	        // 2. Buscar usuario que aprueba
	        Optional<Usuario> usuarioOpt = usuarioRepository.findById(dto.getIdUsuarioAprueba());
	        if (usuarioOpt.isEmpty()) {
	            return ResponseEntity.badRequest().body("Usuario aprobador no encontrado");
	        }

	        // 3. Buscar estado "APROBADA"
	        Optional<EstadoDonacion> estadoOpt = estadoDonacionRepository.findByNombreEstado(dto.getEstadoDonacion());
	        if (estadoOpt.isEmpty()) {
	            return ResponseEntity.badRequest().body("Estado de donación inválido");
	        }

	        // 4. Actualizar medicamento: solo activar
	        if (detalle.getMedicamento() != null) {
	            Medicamento medicamento = detalle.getMedicamento();
	            medicamento.setActivo(true);
	            medicamentoRepository.save(medicamento);
	        }

	        // 5. Actualizar campos de la donación
	        donacion.setEstadoDonacion(estadoOpt.get());
	        donacion.setUsuarioAprueba(usuarioOpt.get());
	        donacion.setFechaResolucion(LocalDateTime.now());

	        // 6. Guardar cambios
	        donacionRepository.save(donacion);

	        return ResponseEntity.ok("Donación aprobada correctamente");

	    } catch (Exception e) {
	        e.printStackTrace();
	        return ResponseEntity.internalServerError().body("Error al aprobar la donación");
	    }
	}

	
	// ==================================================  ==================================================
}
