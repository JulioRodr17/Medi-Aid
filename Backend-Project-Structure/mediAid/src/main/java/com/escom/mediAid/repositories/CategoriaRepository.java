package com.escom.mediAid.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.escom.mediAid.models.Categoria;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Integer> {
}
