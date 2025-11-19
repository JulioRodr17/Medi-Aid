package com.escom.mediAid.controllers;

import com.escom.mediAid.models.Noticias;
import com.escom.mediAid.services.NoticiaService;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/noticias")
public class NoticiasController {

    private final NoticiaService noticiaService;

    // Inyección por constructor
    public NoticiasController(NoticiaService noticiaService) {
        this.noticiaService = noticiaService;
    }

    // ==================================================
    // Obtener noticias activas (usuarios)
    // ==================================================
    @GetMapping("/activas")
    public List<Noticias> obtenerNoticiasActivas() {
        return noticiaService.obtenerNoticiasActivas();
    }

    // ==================================================
    // Obtener todas las noticias (admin o pruebas)
    // ==================================================
    @GetMapping("/todas")
    @PreAuthorize("hasRole('DOCTOR')")
    public List<Noticias> obtenerTodas() {
        return noticiaService.obtenerTodasNoticias();
    }
}
