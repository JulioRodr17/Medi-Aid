package com.escom.mediAid.controllers;

import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.*;

@RestController
@RequestMapping("/api/public")
public class PublicController {

    private final Path publicRoot = Paths.get("public");

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
    
    @PreAuthorize("isAuthenticated()")
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
}
