package com.escom.mediAid.services;

import com.escom.mediAid.models.Noticias;
import com.escom.mediAid.repositories.NoticiaRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class NoticiaService {

    private final NoticiaRepository noticiaRepo;

    public NoticiaService(NoticiaRepository noticiaRepo) {
        this.noticiaRepo = noticiaRepo;
    }

    // Noticias activas (filtradas por fecha y activo)
    public List<Noticias> obtenerNoticiasActivas() {
        LocalDate hoy = LocalDate.now();
        return noticiaRepo.findByActivoTrueAndFechaInicioLessThanEqualAndFechaExpiracionGreaterThanEqual(hoy, hoy);
    }

    // Obtener todas las noticias (sin filtro)
    public List<Noticias> obtenerTodasNoticias() {
        return noticiaRepo.findAll();
    }
}
