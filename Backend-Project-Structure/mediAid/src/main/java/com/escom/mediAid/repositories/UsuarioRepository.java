package com.escom.mediAid.repositories;

import com.escom.mediAid.models.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    boolean existsByCorreo(String correo);
    boolean existsByBoleta(String boleta);
    boolean existsByTelefono(String telefono);
	
	Optional<Usuario> findByCorreo(String correo);
	Optional<Usuario> findByBoleta(String boleta);
}
