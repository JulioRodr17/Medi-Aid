package com.escom.mediAid.security;

import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class JwtFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String path = request.getRequestURI();

        // 🔹 Excluir rutas públicas (sin token)
        if (path.startsWith("/api/public/verify") ||
        	
        	path.startsWith("/api/usuarios/login") ||
            path.startsWith("/api/usuarios/registro") ||
            path.startsWith("/api/usuarios/forgot-password") ||
            path.startsWith("/api/usuarios/reset-password") ||

            path.startsWith("/api/proxy/qrFast") ||
            path.startsWith("/api/proxy/qrSlow") ||
            
            path.startsWith("/api/noticias/activas")) {
            filterChain.doFilter(request, response);
            return;
        }

        // 🔹 Validar token
        String header = request.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")) {
            String token = header.substring(7);

            if (!JwtUtil.validateToken(token)) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("Token inválido o expirado");
                return;
            }

            // 🔹 Extraer claims
            Claims claims = JwtUtil.getClaims(token);
            String rol = (String) claims.get("rol");
            System.out.println(rol);
            Boolean admin = (Boolean) claims.get("admin");

            // 🔹 Crear authorities para Spring Security
            List<SimpleGrantedAuthority> authorities = new ArrayList<>();
            if (rol != null) authorities.add(new SimpleGrantedAuthority("ROLE_" + rol.toUpperCase()));
            if (Boolean.TRUE.equals(admin)) authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));

            // 🔹 Crear Authentication y setear en el contexto de seguridad
            UsernamePasswordAuthenticationToken auth =
                    new UsernamePasswordAuthenticationToken(JwtUtil.getUserId(token), null, authorities);

            SecurityContextHolder.getContext().setAuthentication(auth);

        } else {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Falta el token de autorización");
            return;
        }

        // 🔹 Continuar con la cadena de filtros
        filterChain.doFilter(request, response);
    }
}
