package com.escom.mediAid.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.escom.mediAid.models.DetalleDonacion;

import org.springframework.stereotype.Repository;

@Repository
public interface DetalleDonacionRepository extends JpaRepository<DetalleDonacion, Integer> {
	List<DetalleDonacion> findByDonacion_UsuarioDonante_IdOrderByDonacion_FechaRegistroDesc(Integer idUsuario);
	List<DetalleDonacion> findByDonacion_EstadoDonacion_NombreEstadoOrderByDonacion_FechaRegistroDesc(String estado);

}
