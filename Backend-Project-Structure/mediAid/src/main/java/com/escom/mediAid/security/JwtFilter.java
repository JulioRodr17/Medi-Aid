package com.escom.mediAid.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;

public class JwtFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {
    	
        String path = request.getRequestURI();

        // 🔹 Excluir rutas públicas (sin token)
        if (path.startsWith("/api/usuarios/login") ||
            path.startsWith("/api/usuarios/registro") ||
            path.startsWith("/api/usuarios/recuperar-contrasena") ||
            path.startsWith("/api/proxy/qr")) {
            filterChain.doFilter(request, response);
            return;
        }

        // 🔹 Para las demás rutas, validar el token
        String header = request.getHeader("Authorization");

        if (header != null && header.startsWith("Bearer ")) {
            String token = header.substring(7);

            if (!JwtUtil.validateToken(token)) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("Token inválido o expirado");
                return;
            }
        } else {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Falta el token de autorización");
            return;
        }

        filterChain.doFilter(request, response);
    }
}
