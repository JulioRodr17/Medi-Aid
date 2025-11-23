package com.escom.mediAid;

import org.springframework.beans.factory.annotation.Value;
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
import org.springframework.security.config.Customizer;

import com.escom.mediAid.security.JwtFilter;

import java.util.List;

@Configuration
@EnableWebSecurity
public class MediAidConfig {
	
    @Value("${app.rutaReact}")	private String rutaReact;
    @Value("${app.timeout}")	private Integer timeOut;
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            // CORS y CSRF
            .cors(Customizer.withDefaults())
            .csrf(csrf -> csrf.disable())

            // 🔹 Filtro JWT antes del de autenticación
            .addFilterBefore(new JwtFilter(), UsernamePasswordAuthenticationFilter.class)

            // Autorizaciones
            .authorizeHttpRequests(auth -> auth
                // 🔓 Rutas públicas
                .requestMatchers("/api/public/verify").permitAll()
                
                .requestMatchers("/api/usuarios/registro").permitAll()
                .requestMatchers("/api/usuarios/login").permitAll()
                .requestMatchers("/api/usuarios/forgot-password").permitAll()
                .requestMatchers("/api/usuarios/reset-password").permitAll()
                
                .requestMatchers("/api/proxy/qrFast").permitAll()
                .requestMatchers("/api/proxy/qrSlow").permitAll()
                
                .requestMatchers("/api/noticias/activas").permitAll()
                // 🔒 Resto requiere autenticación
                .anyRequest().authenticated()
            );

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of(rutaReact)); // tu frontend
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
        factory.setConnectTimeout(timeOut); // 60 segundos para conectarse
        factory.setReadTimeout(timeOut);    // 60 segundos para leer la respuesta
        return new RestTemplate(factory);
    }
}
