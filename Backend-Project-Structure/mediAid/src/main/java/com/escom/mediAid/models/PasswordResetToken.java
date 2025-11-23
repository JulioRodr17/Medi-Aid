package com.escom.mediAid.models;

import java.time.LocalDateTime;
import jakarta.persistence.*;

@Entity
@Table(name = "password_reset_token")
public class PasswordResetToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true)
    private String token;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @Column(name = "expiration", nullable = false)
    private LocalDateTime expiration;

    public PasswordResetToken() {}

    public PasswordResetToken(Usuario usuario, String token, int expirationMinutes) {
        this.usuario = usuario;
        this.token = token;
        this.expiration = LocalDateTime.now().plusMinutes(expirationMinutes);
    }

    // Getters y Setters

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Usuario getUsuario() { 
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public LocalDateTime getExpiration() {
        return expiration;
    }

    public void setExpiration(LocalDateTime expiration) {
        this.expiration = expiration;
    }

    // Igual que en VerificationToken
    public boolean isExpired() {
        return LocalDateTime.now().isAfter(expiration);
    }
}
