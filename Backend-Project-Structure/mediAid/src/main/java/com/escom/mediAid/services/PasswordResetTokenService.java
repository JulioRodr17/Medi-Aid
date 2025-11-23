package com.escom.mediAid.services;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.escom.mediAid.models.PasswordResetToken;
import com.escom.mediAid.models.Usuario;
import com.escom.mediAid.repositories.PasswordResetTokenRepository;

@Service
public class PasswordResetTokenService {

    @Value("${app.expPasswordReset}") 
    private int expPasswordReset; // minutos de vigencia

    private final PasswordResetTokenRepository tokenRepo;

    public PasswordResetTokenService(PasswordResetTokenRepository tokenRepo) {
        this.tokenRepo = tokenRepo;
    }

    /**
     * Crear un nuevo token o actualizar el existente para este usuario
     */
    @Transactional
    public PasswordResetToken createTokenForUser(Usuario usuario) {

        // Genera token único
        String token = UUID.randomUUID().toString();

        // Busca si ya existe uno para este usuario
        Optional<PasswordResetToken> optToken = tokenRepo.findByUsuarioId(usuario.getId());

        PasswordResetToken prt;

        if (optToken.isPresent()) {
            // Si existe, solo actualizamos token y fecha de expiración
            prt = optToken.get();
            prt.setToken(token);
            prt.setExpiration(LocalDateTime.now().plusMinutes(expPasswordReset));
        } else {
            // Si no existe, creamos uno nuevo
            prt = new PasswordResetToken(usuario, token, expPasswordReset);
        }

        return tokenRepo.save(prt);
    }

    /**
     * Obtener token válido
     */
    public PasswordResetToken getToken(String token) {
        PasswordResetToken dbToken = tokenRepo.findByToken(token)
                .orElseThrow(() -> new IllegalArgumentException("Token inválido"));

        if (dbToken.getExpiration().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("El token ha expirado");
        }

        return dbToken;
    }

    /**
     * Eliminar token (por ejemplo cuando ya se usó)
     */
    public void deleteToken(PasswordResetToken token) {
        tokenRepo.delete(token);
    }
}
