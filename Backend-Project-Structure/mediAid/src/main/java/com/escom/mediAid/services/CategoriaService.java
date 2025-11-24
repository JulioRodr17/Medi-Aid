package com.escom.mediAid.services;


import org.springframework.stereotype.Service;

import com.escom.mediAid.models.Categoria;
import com.escom.mediAid.repositories.CategoriaRepository;

import java.util.Comparator;
import java.util.List;

@Service
public class CategoriaService {

    private final CategoriaRepository categoriaRepository;

    public CategoriaService(CategoriaRepository categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }

    public List<Categoria> getAllCategorias() {
        return categoriaRepository.findAll()
            .stream()
            .sorted(Comparator.comparing(Categoria::getNombreCategoria))
            .toList();
    }

}
