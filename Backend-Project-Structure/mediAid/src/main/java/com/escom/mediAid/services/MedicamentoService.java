package com.escom.mediAid.services;

import org.springframework.stereotype.Service;

import java.lang.reflect.Field;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

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
    public Medicamento agregar(Medicamento medicamento) {
        medicamento.setActivo(true);
        medicamento.setFechaRegistro(LocalDateTime.now());
        return medicamentoRepository.save(medicamento);
    }
    
    // ==================================================  ==================================================
    public Medicamento actualizar(Medicamento medicamento) {

        Medicamento existente = medicamentoRepository.findById(medicamento.getId())
                .orElseThrow(() -> new RuntimeException("Medicamento no encontrado"));

        existente.setNombreMedicamento(medicamento.getNombreMedicamento());
        existente.setCategoria(medicamento.getCategoria());
        existente.setDescripcion(medicamento.getDescripcion());
        existente.setPresentacion(medicamento.getPresentacion());
        existente.setDosis(medicamento.getDosis());
        existente.setCantidadStock(medicamento.getCantidadStock());
        existente.setStockMinimo(medicamento.getStockMinimo());
        existente.setFechaCaducidad(medicamento.getFechaCaducidad());
        existente.setUso(medicamento.getUso());

        return medicamentoRepository.save(existente);
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
            .filter(m -> m.getCantidadStock() <= m.getStockMinimo())
            .sorted(Comparator.comparing(Medicamento::getNombreMedicamento))
            .map(m -> new ScarceMedicamentoDTO(m.getId(), m.getNombreMedicamento()))
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
