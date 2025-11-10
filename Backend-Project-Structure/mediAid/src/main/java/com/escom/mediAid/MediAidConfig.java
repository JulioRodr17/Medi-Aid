package com.escom.mediAid;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.escom.mediAid.security.JwtFilter;

import java.util.List;

@Configuration
@EnableWebSecurity
public class MediAidConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors().and().csrf().disable()
            // 🔹 Aquí agregas tu filtro personalizado antes del de autenticación
            .addFilterBefore(new JwtFilter(), UsernamePasswordAuthenticationFilter.class)
            .authorizeHttpRequests()
            // 🔓 Rutas públicas (sin token)
            .requestMatchers("/api/usuarios/registro").permitAll()
            .requestMatchers("/api/usuarios/login").permitAll()
            .requestMatchers("/api/usuarios/recuperar-contrasena").permitAll()
            .requestMatchers("/api/proxy/qr").permitAll()
            // 🔒 Todas las demás requieren JWT válido
            .anyRequest().authenticated();

        return http.build();
    }

 
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:5173", "https://135.224.184.142")); // tu frontend
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
    
    @Bean
    public RestTemplate restTemplate() {
        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
        factory.setConnectTimeout(60000); // 60 segundos para conectarse
        factory.setReadTimeout(60000);    // 60 segundos para leer la respuesta
        return new RestTemplate(factory);
    }
}
