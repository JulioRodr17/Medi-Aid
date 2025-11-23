package com.escom.mediAid.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.escom.mediAid.models.PasswordResetToken;

@Repository
public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {

    // Buscar token por el string del token
    Optional<PasswordResetToken> findByToken(String token);

    // Buscar token asociado al usuario
    Optional<PasswordResetToken> findByUsuarioId(Integer usuarioId);
}