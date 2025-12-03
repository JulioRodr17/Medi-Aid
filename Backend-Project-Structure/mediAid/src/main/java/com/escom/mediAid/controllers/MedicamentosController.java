package com.escom.mediAid.controllers;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.escom.mediAid.dtos.MedicamentoDTO;
import com.escom.mediAid.dtos.ScarceMedicamentoDTO;
import com.escom.mediAid.models.Categoria;
import com.escom.mediAid.models.Medicamento;
import com.escom.mediAid.services.CategoriaService;
import com.escom.mediAid.services.FotoService;
import com.escom.mediAid.services.MedicamentoService;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/medicamentos")
public class MedicamentosController {
    
    private final CategoriaService categoriaService;
    private final MedicamentoService medicamentoService;
    private final FotoService fotoService;

    public MedicamentosController(CategoriaService categoriaService, MedicamentoService medicamentoService, FotoService fotoService) {
        this.categoriaService = categoriaService;
        this.medicamentoService = medicamentoService;
        this.fotoService = fotoService;
    }
	// ================================================== Listar usuarios ==================================================
    @GetMapping("/filtrados")
    public ResponseEntity<Map<String, Object>> getMedicamentosFiltrados(
            @RequestParam(required = false, defaultValue = "") String search,
            @RequestParam(required = false) Integer category,
            @RequestParam(required = false, defaultValue = "0") int page,
            @RequestParam(required = false, defaultValue = "6") int size,
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
    @PostMapping("/agregar")
    @PreAuthorize("hasRole('DOCTOR')")
    public ResponseEntity<String> agregarMedicamento(
            @RequestPart("medication") String medicamentoJson,
            @RequestPart(value = "imagen", required = true) MultipartFile imagen) { // Imagen obligatoria

        try {
            ObjectMapper mapper = new ObjectMapper();
            // Registrar módulos para LocalDate si el DTO los tiene
            mapper.findAndRegisterModules();

            MedicamentoDTO dto = mapper.readValue(medicamentoJson, MedicamentoDTO.class);

            System.out.println("Medicamento recibido: " + dto);

            // 1. Crear medicamento en BD sin URL aún
            Medicamento nuevoMedicamento = medicamentoService.crearDesdeDTO(dto);

            // 2. Guardar imagen obligatoria y obtener URL
            String urlImagen = fotoService.guardarImagenMedicamento(nuevoMedicamento.getId(), imagen);

            // 3. Asignar URL directamente y guardar
            nuevoMedicamento.setUrl(urlImagen);
            medicamentoService.actualizar(nuevoMedicamento);

            return ResponseEntity.ok("Medicamento agregado correctamente");

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError()
                    .body("Error al agregar el medicamento");
        }
    }


    // ==================================================  ==================================================
    @PutMapping("/actualiza")
    @PreAuthorize("hasRole('DOCTOR')")
    public ResponseEntity<String> actualizarMedicamento(
            @RequestPart("medication") String medicamentoJson,
            @RequestPart(value = "imagen", required = false) MultipartFile imagen) {

        try {
            ObjectMapper mapper = new ObjectMapper();
            // Permite manejar fechas como String (fechaCaducidad)
            mapper.findAndRegisterModules();

            MedicamentoDTO medicamentoDTO = mapper.readValue(medicamentoJson, MedicamentoDTO.class);

            System.out.println("Medicamento recibido: " + medicamentoDTO);

            String urlImagen = null;

            // 1. Guardar imagen si existe
            if (imagen != null && !imagen.isEmpty()) {
                System.out.println("Imagen recibida: " + imagen.getOriginalFilename());
                urlImagen = fotoService.guardarImagenMedicamento(medicamentoDTO.getId(), imagen);
            }

            // 2. Actualizar medicamento con la URL si existe
            medicamentoService.actualizarDesdeDTO(medicamentoDTO, urlImagen);

            return ResponseEntity.ok("Medicamento actualizado correctamente");

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError()
                    .body("Error al actualizar el medicamento");
        }
    }

	// ==================================================  ==================================================
    @DeleteMapping("/inactivar/{id}")
    public ResponseEntity<Void> deleteMedicamento(@PathVariable Integer id) {
        medicamentoService.deleteMedicamento(id);
        return ResponseEntity.noContent().build();
    }


	// ==================================================  ==================================================
}
