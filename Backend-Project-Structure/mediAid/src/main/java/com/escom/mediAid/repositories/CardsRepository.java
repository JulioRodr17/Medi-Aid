package com.escom.mediAid.repositories;

import com.escom.mediAid.models.Cards;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CardsRepository extends JpaRepository<Cards, Integer> {

    // Obtener solo las cards activas ordenadas
    List<Cards> findByActivoTrueOrderByOrdenAsc();
}
