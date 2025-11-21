package com.escom.mediAid.models;

import java.time.LocalDateTime;
import jakarta.persistence.*;

@Entity
@Table(name = "verification_token") // nombre EXACTO como en la BD
public class VerificationToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String token;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @Column(name = "expiration", nullable = false)
    private LocalDateTime expiration;

    // Constructor vacío
    public VerificationToken() {}

    // Constructor principal
    public VerificationToken(Usuario usuario, String token, int expirationMinutes) {
        this.usuario = usuario;
        this.token = token;
        this.expiration = LocalDateTime.now().plusMinutes(expirationMinutes);
    }

    // Getter y Setter de id
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    // Getter y Setter de token
    public String getToken() {
        return token;
    }
    public void setToken(String token) {
        this.token = token;
    }

    // Getter y Setter de usuario
    public Usuario getUsuario() {
        return usuario;
    }
    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    // Getter y Setter de expiration
    public LocalDateTime getExpiration() {
        return expiration;
    }
    public void setExpiration(LocalDateTime expiration) {
        this.expiration = expiration;
    }

    // Método para verificar si ya expiró
    public boolean isExpired() {
        return LocalDateTime.now().isAfter(expiration);
    }
}
