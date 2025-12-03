package com.escom.mediAid.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.escom.mediAid.models.Categoria;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Integer> {
    Optional<Categoria> findByNombreCategoria(String nombreCategoria);
}
