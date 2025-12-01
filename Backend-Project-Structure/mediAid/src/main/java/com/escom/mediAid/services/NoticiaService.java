package com.escom.mediAid.services;

import com.escom.mediAid.dtos.NoticiaDTO;
import com.escom.mediAid.models.Cards;
import com.escom.mediAid.models.Noticias;
import com.escom.mediAid.repositories.CardsRepository;
import com.escom.mediAid.repositories.NoticiaRepository;

import jakarta.transaction.Transactional;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class NoticiaService {

	private final NoticiaRepository noticiaRepo;
	private final CardsRepository cardsRepo;

    public NoticiaService(NoticiaRepository noticiaRepo, CardsRepository cardsRepo) {
        this.noticiaRepo = noticiaRepo;
        this.cardsRepo = cardsRepo;
    }

    // Noticias activas (filtradas por fecha y activo)
    public List<Noticias> obtenerNoticiasActivas() {
        LocalDate hoy = LocalDate.now();
        return noticiaRepo.findByActivoTrueAndFechaInicioLessThanEqualAndFechaExpiracionGreaterThanEqual(hoy, hoy);
    }

    // Obtener todas las noticias (sin filtro)
    public List<Noticias> obtenerTodasNoticias() {
        return noticiaRepo.findAllByOrderByActivoDescFechaExpiracionAsc();
    }
    
    public List<Cards> obtenerCards(){
    	return cardsRepo.findByActivoTrueOrderByOrdenAsc();
    }
    
    public List<Cards> obtenerTodasCards(){
    	return cardsRepo.findAll();
    }
    

    public Noticias crearDesdeDTO(NoticiaDTO dto) {
        Noticias noticia = new Noticias();
        noticia.setTitulo(dto.getTitulo());
        noticia.setDescripcion(dto.getDescripcion());
        noticia.setFechaInicio(LocalDate.parse(dto.getFechaInicio()));
        noticia.setFechaExpiracion(LocalDate.parse(dto.getFechaExpiracion()));
        noticia.setActivo(dto.getActivo() != null ? dto.getActivo() : true);
        noticia.setOrden(dto.getOrden() != null ? dto.getOrden() : 0);
        noticia.setUrl("");
        // URL se asigna después de guardar la imagen
        return noticiaRepo.save(noticia);
    }
    
    public Noticias actualizarDesdeDTO(NoticiaDTO dto, String url) {

        Noticias noticia = noticiaRepo.findById(dto.getId())
                .orElseThrow(() -> new RuntimeException("Noticia no encontrada con ID: " + dto.getId()));

        noticia.setTitulo(dto.getTitulo());
        noticia.setDescripcion(dto.getDescripcion());
        noticia.setFechaInicio(LocalDate.parse(dto.getFechaInicio()));
        noticia.setFechaExpiracion(LocalDate.parse(dto.getFechaExpiracion()));
        noticia.setActivo(dto.getActivo());
        noticia.setOrden(dto.getOrden());

        if (url != null) {
            noticia.setUrl(url);
        }

        return noticiaRepo.save(noticia);
    }
    
    public Noticias actualizar(Noticias noticia) {
        // Aquí ya se asume que la noticia tiene ID válido y datos actualizados
        return noticiaRepo.save(noticia);
    }
    
    @Transactional
    public void actualizarCards(List<Cards> cards) {
        for (Cards card : cards) {
        	Cards existente = cardsRepo.findById(card.getId())
                    .orElseThrow(() -> new RuntimeException("Card no encontrada con ID: " + card.getId()));

            existente.setIcon(card.getIcon());
            existente.setTitle(card.getTitle());
            existente.setText(card.getText());
            existente.setActivo(card.getActivo());

            cardsRepo.save(existente);
        }
    }

}
