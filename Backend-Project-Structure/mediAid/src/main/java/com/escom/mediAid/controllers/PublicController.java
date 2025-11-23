package com.escom.mediAid.controllers;

import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.escom.mediAid.models.Usuario;
import com.escom.mediAid.models.VerificationToken;
import com.escom.mediAid.repositories.UsuarioRepository;
import com.escom.mediAid.repositories.VerificationTokenRepository;
import com.escom.mediAid.services.EmailService;
import com.escom.mediAid.services.VerificationTokenService;

import java.io.IOException;
import java.nio.file.*;
import java.util.Optional;

@RestController
@RequestMapping("/api/public")
public class PublicController {

    private final Path publicRoot = Paths.get("public");
    private final VerificationTokenRepository verificationTokenRepo;
    private final VerificationTokenService verificationTokenService;
    private final UsuarioRepository usuarioRepo;
    private final EmailService emailService;
    
    public PublicController(UsuarioRepository usuarioRepo, EmailService emailService, VerificationTokenService verificationTokenService, VerificationTokenRepository verificationTokenRepo) {
    	this.verificationTokenRepo = verificationTokenRepo;
    	this.verificationTokenService = verificationTokenService;
    	this.emailService = emailService;
    	this.usuarioRepo = usuarioRepo;
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/UserPhoto/{foto}")
    public ResponseEntity<byte[]> obtenerFoto(@PathVariable String foto) {
        try {
            Path fotoPath = publicRoot.resolve(Paths.get("UserPhotos", foto)).normalize();
            System.out.println(fotoPath);
            if (!Files.exists(fotoPath)) {
                return ResponseEntity.notFound().build();
            }

            byte[] fotoBytes = Files.readAllBytes(fotoPath);
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.IMAGE_JPEG);

            return new ResponseEntity<>(fotoBytes, headers, HttpStatus.OK);

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @GetMapping("/Noticias/{noticia}")
    public ResponseEntity<byte[]> obtenerNoticia(@PathVariable String noticia) {
        try {
            Path fotoPath = publicRoot.resolve(Paths.get("Noticias", noticia)).normalize();
            System.out.println(fotoPath);
            if (!Files.exists(fotoPath)) {
                return ResponseEntity.notFound().build();
            }

            byte[] fotoBytes = Files.readAllBytes(fotoPath);
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.IMAGE_JPEG);

            return new ResponseEntity<>(fotoBytes, headers, HttpStatus.OK);

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    
    @GetMapping("/verify")
    public ResponseEntity<String> verify(@RequestParam String token) {
        Optional<VerificationToken> optVt = verificationTokenRepo.findByToken(token);

        if (optVt.isEmpty()) {
            return ResponseEntity.badRequest().body("Token inválido");
        }

        VerificationToken vt = optVt.get();

        Usuario usuario = vt.getUsuario();

        if (vt.isExpired()) {
            // Generar un nuevo token
            VerificationToken newToken = verificationTokenService.createTokenForUser(usuario);
            // Enviar correo con nuevo token
            emailService.sendVerificationEmail(usuario.getCorreo(), newToken.getToken());
            return ResponseEntity.badRequest().body("El token ha expirado. Se ha enviado un nuevo correo de verificación.");
        }
        else if(usuario.getActive()) {
            return ResponseEntity.badRequest().body("Su cuenta ya se encuentra activa.");
        }

        usuario.setActive(true);
        usuarioRepo.save(usuario);

        return ResponseEntity.ok("Correo verificado correctamente");
    }

}
