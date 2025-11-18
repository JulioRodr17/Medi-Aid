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

	// ================================================== GENERACIÓN DE TOKEN DE SESION ==================================================
	public static String generateToken(Integer userId, String rol, Boolean admin) {
		Date now = new Date();
		Date exp = new Date(System.currentTimeMillis() + EXPIRATION_TIME);

		return Jwts.builder()
			.setSubject(userId.toString())  // ID del usuario como subject
			.claim("rol", rol)
			.claim("admin", admin)
			.setIssuedAt(now)
			.setExpiration(exp)
			.signWith(key)
			.compact();
	}
	
	// ================================================== VALIDACION DE TOKEN DE SESION ==================================================
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
	// ================================================== OBTENCIÓN DE INFO DE TOKEN ==================================================
	public static Claims getClaims(String token) {
		return Jwts.parserBuilder()
			.setSigningKey(key)
			.build()
			.parseClaimsJws(token)
			.getBody();
	}
	
	// ================================================== OBTENCION DE ID ==================================================
	public static Integer getUserId(String token) {
		return Integer.valueOf(getClaims(token).getSubject());
	}

	// ================================================== OBTENCION DE ROL ==================================================
	public static String getRol(String token) {
		return (String) getClaims(token).get("rol");
	}

	// ================================================== OBTENCION DE PERMISOS ==================================================
	public static boolean isAdmin(String token) {
		return (Boolean) getClaims(token).get("admin");
	}
	
	// ======================================================================================================================================================
}
