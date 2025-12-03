package com.escom.mediAid.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.escom.mediAid.models.Donacion;

import org.springframework.stereotype.Repository;

@Repository
public interface DonacionRepository extends JpaRepository<Donacion, Integer> {
	List<Donacion> findByUsuarioDonante_Id(Integer donanteId);
	List<Donacion> findByUsuarioAprueba_Id(Integer doctorId);
	
	long countByEstadoDonacion_NombreEstadoIgnoreCase(String nombreEstado);
}
