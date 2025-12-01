package com.escom.mediAid.controllers;

import com.escom.mediAid.models.Noticias;
import com.escom.mediAid.dtos.NoticiaDTO;
import com.escom.mediAid.models.Cards;
import com.escom.mediAid.services.FotoService;
import com.escom.mediAid.services.NoticiaService;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/noticias")
public class NoticiasController {

    private final NoticiaService noticiaService;
    private final FotoService fotoService;

    // Inyección por constructor
    public NoticiasController(NoticiaService noticiaService, FotoService fotoService) {
        this.noticiaService = noticiaService;
        this.fotoService = fotoService;
    }

    // ==================================================
    // Obtener noticias activas (usuarios) 
    // ==================================================
    @GetMapping("/activas")
    public List<Noticias> obtenerNoticias(@RequestParam(defaultValue = "false") boolean inactivas) {
        if (inactivas)	return noticiaService.obtenerTodasNoticias();
        return noticiaService.obtenerNoticiasActivas();
    }

    // ==================================================
    // Obtener noticias activas (usuarios)
    // ==================================================
    @GetMapping("/cards")
    public List<Cards> obtenerCards(@RequestParam(defaultValue = "false") boolean inactivas) {
    	if (inactivas)	return noticiaService.obtenerTodasCards();
		return noticiaService.obtenerCards();
    }

    // ==================================================
    // Obtener todas las noticias (admin o pruebas)
    // ==================================================
    @GetMapping("/todas")
    @PreAuthorize("hasRole('DOCTOR')")
    public List<Noticias> obtenerTodas() {
        return noticiaService.obtenerTodasNoticias();
    }


    @PutMapping("/actualiza")
    @PreAuthorize("hasRole('DOCTOR')")
    public ResponseEntity<String> actualizarCarrusel(
            @RequestPart("noticias") String noticiaJson,
            @RequestPart(value = "imagenes", required = false) MultipartFile imagen) {

        try {
            ObjectMapper mapper = new ObjectMapper();
            NoticiaDTO noticiaDTO = mapper.readValue(noticiaJson, NoticiaDTO.class);

            System.out.println("Noticia recibida: " + noticiaDTO);

            String urlImagen = null;

            // 1. Guardar imagen si existe
            if (imagen != null && !imagen.isEmpty()) {
                System.out.println("Imagen recibida: " + imagen.getOriginalFilename());
                urlImagen = fotoService.guardarImagenNoticia(noticiaDTO.getId(), imagen);
            }

            // 2. Ahora sí, actualizar la noticia con su URL
            noticiaService.actualizarDesdeDTO(noticiaDTO, urlImagen);

            return ResponseEntity.ok("Noticia actualizada correctamente");

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError()
                    .body("Error al actualizar la noticia");
        }
    }
    
    @PostMapping("/nueva")
    @PreAuthorize("hasRole('DOCTOR')")
    public ResponseEntity<String> agregarNoticia(
            @RequestPart("noticias") String noticiaJson,
            @RequestPart("imagenes") MultipartFile imagen) { // Imagen obligatoria

        try {
            ObjectMapper mapper = new ObjectMapper();
            NoticiaDTO noticiaDTO = mapper.readValue(noticiaJson, NoticiaDTO.class);

            System.out.println("Noticia recibida: " + noticiaDTO);

            // 1. Crear noticia en BD sin URL aún
            Noticias nuevaNoticia = noticiaService.crearDesdeDTO(noticiaDTO);

            // 2. Guardar imagen obligatoria y obtener URL
            String urlImagen = fotoService.guardarImagenNoticia(nuevaNoticia.getId(), imagen);

            // 3. Asignar URL directamente y guardar
            nuevaNoticia.setUrl(urlImagen);
            noticiaService.actualizar(nuevaNoticia);
 
            return ResponseEntity.ok("Noticia agregada correctamente");

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError()
                    .body("Error al agregar la noticia");
        }
    }
    
	@PutMapping("/cards")
	@PreAuthorize("hasRole('DOCTOR')")
	public ResponseEntity<String> actualizarCards(@RequestBody List<Cards> cards) {
	    try {
	        noticiaService.actualizarCards(cards);
	        return ResponseEntity.ok("Cards actualizadas correctamente");
	    } catch (Exception e) {
	        e.printStackTrace();
	        return ResponseEntity.internalServerError().body("Error al actualizar las cards");
	    }
	}
}
