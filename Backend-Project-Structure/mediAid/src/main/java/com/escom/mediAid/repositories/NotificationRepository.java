package com.escom.mediAid.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.escom.mediAid.models.Notificacion;

public interface NotificationRepository extends JpaRepository<Notificacion, Long> {
    // Devuelve todas las notificaciones de un usuario ordenadas por fecha de registro descendente
    List<Notificacion> findByUsuarioIdOrderByFechaRegistroDesc(Integer usuarioId);
    List<Notificacion> findByUsuarioIdAndLeidaFalse(Long usuarioId);

}
