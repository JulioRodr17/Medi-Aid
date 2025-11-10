package com.escom.mediAid.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import java.security.Key;
import java.util.Date;

public class JwtUtil {

    // Clave secreta para firmar el token (en producción ponerla en variables de entorno)
    private static final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    // Tiempo de expiración: 1 hora
    private static final long EXPIRATION_TIME = 3600_000; // 1 hora en ms

    public static String generateToken(String correo, boolean admin, String rol) {
        return Jwts.builder()
                .setSubject(correo)
                .claim("rol", rol)
                .claim("admin", admin)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(key)
                .compact();
    }

 // 🔹 Validar si el token es válido y no ha expirado
    public static boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token);
            return true; // Si no lanza excepción, el token es válido
        } catch (JwtException e) {
            return false; // Token inválido o expirado
        }
    }

    // 🔹 Extraer claims (por ejemplo, el correo o el rol)
    public static Claims getClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public static String getCorreo(String token) {
        return getClaims(token).getSubject();
    }

    public static String getRol(String token) {
        return (String) getClaims(token).get("rol");
    }

    public static boolean isAdmin(String token) {
        return (Boolean) getClaims(token).get("admin");
    }
}
