package com.escom.mediAid.controllers;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.escom.mediAid.dtos.LoginDTO;
import com.escom.mediAid.dtos.ResetPasswordDTO;
import com.escom.mediAid.dtos.ScarceMedicamentoDTO;
import com.escom.mediAid.dtos.UsuarioDTO;
import com.escom.mediAid.models.Categoria;
import com.escom.mediAid.models.Medicamento;
import com.escom.mediAid.models.PasswordResetToken;
import com.escom.mediAid.models.Usuario;
import com.escom.mediAid.models.VerificationToken;
import com.escom.mediAid.repositories.PasswordResetTokenRepository;
import com.escom.mediAid.repositories.UsuarioRepository;
import com.escom.mediAid.repositories.VerificationTokenRepository;
import com.escom.mediAid.services.CategoriaService;
import com.escom.mediAid.services.EmailService;
import com.escom.mediAid.services.MedicamentoService;
import com.escom.mediAid.services.PasswordResetTokenService;
import com.escom.mediAid.services.UsuarioService;
import com.escom.mediAid.services.VerificationTokenService;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/medicamentos")
public class MedicamentosController {
    
    private final CategoriaService categoriaService;
    private final MedicamentoService medicamentoService;

    public MedicamentosController(CategoriaService categoriaService, MedicamentoService medicamentoService) {
        this.categoriaService = categoriaService;
        this.medicamentoService = medicamentoService;
    }
	// ================================================== Listar usuarios ==================================================
    @GetMapping("/filtrados")
    public ResponseEntity<Map<String, Object>> getMedicamentosFiltrados(
            @RequestParam(required = false, defaultValue = "") String search,
            @RequestParam(required = false) Integer category,
            @RequestParam(required = false, defaultValue = "0") int page,
            @RequestParam(required = false, defaultValue = "8") int size,
            @RequestParam(required = false, defaultValue = "nombreMedicamento") String sortBy,
            @RequestParam(required = false, defaultValue = "ASC") String sortDirection
    ) {
        // Convertir el string de dirección a Sort.Direction
        Sort.Direction direction;
        try {
            direction = Sort.Direction.fromString(sortDirection);
        } catch (IllegalArgumentException e) {
            direction = Sort.Direction.ASC; // valor por defecto si viene mal
        }

        Page<Medicamento> result = medicamentoService.buscarMedicamentos(
            search, category, page, size, sortBy, direction
        );

        Map<String, Object> response = Map.of(
                "data", result.getContent(),
                "totalElements", result.getTotalElements(),
                "totalPages", result.getTotalPages(),
                "page", result.getNumber()
        );

        return ResponseEntity.ok(response);
    }


	// ================================================== Registrar un usuario ==================================================
    @GetMapping("/scarce")
    public List<ScarceMedicamentoDTO> getScarse() {
        return medicamentoService.getScarce();
    }

	// ==================================================  ==================================================
    @GetMapping("/categorias")
    public List<Categoria> getCategorias() {
        return categoriaService.getAllCategorias();
    }
	
    // ==================================================  ==================================================
    @GetMapping("/nombres")
    public List<String> getNombres() {
        return medicamentoService.getAllNombres();
    } 
    
    // ==================================================  ==================================================
    // AGREGAR
    @PostMapping("/agregar")
    public ResponseEntity<Medicamento> agregar(@RequestBody Medicamento medicamento) {
        Medicamento nuevo = medicamentoService.agregar(medicamento);
        return ResponseEntity.ok(nuevo);
    }

    // ==================================================  ==================================================
    // ACTUALIZAR
    @PutMapping("/actualizar")
    public ResponseEntity<Medicamento> actualizar(@RequestBody Medicamento medicamento) {
        Medicamento actualizado = medicamentoService.actualizar(medicamento);
        return ResponseEntity.ok(actualizado);
    }
	
	// ==================================================  ==================================================
    @DeleteMapping("/inactivar/{id}")
    public ResponseEntity<Void> deleteMedicamento(@PathVariable Integer id) {
        medicamentoService.deleteMedicamento(id);
        return ResponseEntity.noContent().build();
    }


	// ==================================================  ==================================================
}
