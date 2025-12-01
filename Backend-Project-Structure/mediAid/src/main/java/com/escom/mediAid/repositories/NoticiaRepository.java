package com.escom.mediAid.repositories;

import com.escom.mediAid.models.Noticias;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface NoticiaRepository extends JpaRepository<Noticias, Integer> {

    // Método para obtener solo las noticias activas y vigentes
    List<Noticias> findByActivoTrueAndFechaInicioLessThanEqualAndFechaExpiracionGreaterThanEqual(
            LocalDate fechaInicio, LocalDate fechaExpiracion
    );
    
    List<Noticias> findAllByOrderByActivoDescFechaExpiracionAsc();

}
