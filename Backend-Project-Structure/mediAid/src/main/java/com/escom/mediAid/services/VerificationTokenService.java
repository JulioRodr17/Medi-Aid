package com.escom.mediAid.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.escom.mediAid.models.Usuario;
import com.escom.mediAid.models.VerificationToken;
import com.escom.mediAid.repositories.VerificationTokenRepository;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class VerificationTokenService {

    @Value("${app.expRegistro}") 
    private int expRegistro;
	
    private final VerificationTokenRepository tokenRepo;

    public VerificationTokenService(VerificationTokenRepository tokenRepo) {
        this.tokenRepo = tokenRepo;
    }

    @Transactional
    public VerificationToken createTokenForUser(Usuario usuario) {
        // Genera token único
        String token = UUID.randomUUID().toString();

        // Busca si ya existe un token para este usuario
        Optional<VerificationToken> optToken = tokenRepo.findByUsuarioId(usuario.getId());

        VerificationToken vt;
        if (optToken.isPresent()) {
            // Si ya existe, actualizamos el token y la fecha de expiración
            vt = optToken.get();
            vt.setToken(token);
            vt.setExpiration(LocalDateTime.now().plusMinutes(expRegistro)); // por ejemplo, 60 minutos de validez
        } else {
            // Si no existe, creamos uno nuevo
            vt = new VerificationToken(usuario, token, expRegistro);
        }

        return tokenRepo.save(vt);
    }



    public VerificationToken getToken(String token) {
        return tokenRepo.findByToken(token)
                .orElseThrow(() -> new IllegalArgumentException("Token inválido"));
    }

    public void deleteToken(VerificationToken token) {
        tokenRepo.delete(token);
    }
}
