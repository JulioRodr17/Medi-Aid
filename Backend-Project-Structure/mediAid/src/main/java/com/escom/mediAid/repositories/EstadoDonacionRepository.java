package com.escom.mediAid.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.escom.mediAid.models.EstadoDonacion;

import org.springframework.stereotype.Repository;

@Repository
public interface EstadoDonacionRepository extends JpaRepository<EstadoDonacion, Integer> {
    Optional<EstadoDonacion> findByNombreEstado(String nombreEstado);
}
