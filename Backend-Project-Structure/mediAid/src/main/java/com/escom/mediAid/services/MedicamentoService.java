package com.escom.mediAid.services;

import org.springframework.stereotype.Service;

import java.lang.reflect.Field;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import com.escom.mediAid.dtos.MedicamentoDTO;
import com.escom.mediAid.dtos.ScarceMedicamentoDTO;
import com.escom.mediAid.models.Medicamento;
import com.escom.mediAid.repositories.MedicamentoRepository;

@Service
public class MedicamentoService {
 
    private final MedicamentoRepository medicamentoRepository;
    
    // ==================================================  ==================================================
    public MedicamentoService(MedicamentoRepository medicamentoRepository) {
        this.medicamentoRepository = medicamentoRepository;
    }
    
    // ==================================================  ==================================================
    public Medicamento crearDesdeDTO(MedicamentoDTO dto) {
        Medicamento medicamento = new Medicamento();

        medicamento.setNombreMedicamento(dto.getNombreMedicamento());
        
        medicamento.setCategoria(dto.getCategoria());
        medicamento.setDescripcion(dto.getDescripcion() != null ? dto.getDescripcion() : "");
        medicamento.setPresentacion(dto.getPresentacion() != null ? dto.getPresentacion() : "");
        medicamento.setDosis(dto.getDosis() != null ? dto.getDosis() : "");
        medicamento.setCantidadStock(dto.getCantidadStock() != null ? dto.getCantidadStock() : 0);
        medicamento.setStockMinimo(dto.getStockMinimo() != null ? dto.getStockMinimo() : 0);
        medicamento.setFechaCaducidad(dto.getFechaCaducidad()); // Puede ser null si no viene
        medicamento.setUso(dto.getUso() != null ? dto.getUso() : "");
        medicamento.setActivo(dto.getActivo() != null ? dto.getActivo() : true);

        // URL vacía, se asignará después de guardar la imagen
        medicamento.setUrl("");

        return medicamentoRepository.save(medicamento);
    }

    // ==================================================  ==================================================
    public Medicamento actualizarDesdeDTO(MedicamentoDTO dto, String urlImagen) { 

        // 1. Buscar el medicamento existente por ID
        Medicamento medicamento = medicamentoRepository.findById(dto.getId())
                .orElseThrow(() -> new RuntimeException("Medicamento no encontrado con ID: " + dto.getId()));

        // 2. Actualizar campos básicos
        medicamento.setNombreMedicamento(dto.getNombreMedicamento());
        medicamento.setCategoria(dto.getCategoria());
        medicamento.setDescripcion(dto.getDescripcion());
        medicamento.setPresentacion(dto.getPresentacion());
        medicamento.setDosis(dto.getDosis());
        medicamento.setCantidadStock(dto.getCantidadStock());
        medicamento.setStockMinimo(dto.getStockMinimo());
        medicamento.setFechaCaducidad(dto.getFechaCaducidad());
        medicamento.setUso(dto.getUso());
        medicamento.setActivo(dto.getActivo()); // Asegúrate de actualizar el estado también si viene en el DTO

        // 3. Actualizar la URL de la imagen si se proporcionó
        if (urlImagen != null && !urlImagen.isEmpty()) {
            medicamento.setUrl(urlImagen);
        }

        // 4. Guardar y retornar el medicamento actualizado
        return medicamentoRepository.save(medicamento);
    }
    
    
    public Medicamento actualizar(Medicamento medicamento) {
        // Aquí ya se asume que la noticia tiene ID válido y datos actualizados
        return medicamentoRepository.save(medicamento);
    }


    // ==================================================  ==================================================
    public Page<Medicamento> buscarMedicamentos(String search, Integer category, int page, int size, String sortBy, Sort.Direction direction) {
        if (size <= 0) {
            // Traer todos sin paginar
            List<Medicamento> allMeds = medicamentoRepository.findByFilters(search, category, Pageable.unpaged())
                .stream()
                .sorted((m1, m2) -> {
                    try {
                        Field field = Medicamento.class.getDeclaredField(sortBy);
                        field.setAccessible(true);
                        Comparable val1 = (Comparable) field.get(m1);
                        Comparable val2 = (Comparable) field.get(m2);
                        int cmp = val1.compareTo(val2);
                        return direction == Sort.Direction.ASC ? cmp : -cmp;
                    } catch (Exception e) {
                        return 0;
                    }
                })
                .toList();
            return new PageImpl<>(allMeds);
        } else {
            Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortBy));
            return medicamentoRepository.findByFilters(search, category, pageable);
        }
    }
    
    // ==================================================  ==================================================
    public List<ScarceMedicamentoDTO> getScarce() {
        return medicamentoRepository.findAll()
            .stream()
            // Filtra solo activos
            .filter(Medicamento::getActivo)
            // Agrupa por nombre
            .collect(Collectors.groupingBy(Medicamento::getNombreMedicamento))
            .entrySet()
            .stream()
            // Filtra los grupos cuyo stock total sea menor o igual al stock mínimo de algún elemento
            .filter(entry -> {
                String nombre = entry.getKey();
                List<Medicamento> meds = entry.getValue();
                int totalStock = meds.stream().mapToInt(Medicamento::getCantidadStock).sum();
                int minStock = meds.stream().mapToInt(Medicamento::getStockMinimo).min().orElse(0);
                return totalStock <= minStock;
            })
            // Convierte a DTO
            .map(entry -> {
                List<Medicamento> meds = entry.getValue();
                // Prioriza un medicamento con URL si existe
                Medicamento medConUrl = meds.stream().filter(m -> m.getUrl() != null && !m.getUrl().isEmpty())
                                            .findFirst().orElse(meds.get(0));
                return new ScarceMedicamentoDTO(medConUrl.getId(), medConUrl.getNombreMedicamento());
            })
            // Ordena por nombre
            .sorted(Comparator.comparing(ScarceMedicamentoDTO::getName))
            .toList();
    }

    
    // ==================================================  ==================================================
    public List<String> getAllNombres() {
        return medicamentoRepository.findAll()
            .stream()
            .sorted(Comparator.comparing(Medicamento::getNombreMedicamento))
            .map(Medicamento::getNombreMedicamento)
            .distinct()
            .toList();
    }
    
    // ==================================================  ==================================================
    public void deleteMedicamento(Integer id) {
        if (!medicamentoRepository.existsById(id)) {
            throw new IllegalArgumentException("Medicamento no encontrado con id: " + id);
        }
        medicamentoRepository.softDeleteById(id);
    }
    
    // ==================================================  ==================================================
}
