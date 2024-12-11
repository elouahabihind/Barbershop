package com.example.babershopapp.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.List;

import static com.example.babershopapp.constant.Constant.X_REQUESTED_WITH;
import static org.springframework.http.HttpHeaders.ACCEPT;
import static org.springframework.http.HttpHeaders.ACCESS_CONTROL_ALLOW_CREDENTIALS;
import static org.springframework.http.HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN;
import static org.springframework.http.HttpHeaders.ACCESS_CONTROL_REQUEST_HEADERS;
import static org.springframework.http.HttpHeaders.ACCESS_CONTROL_REQUEST_METHOD;
import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.HttpHeaders.CONTENT_TYPE;
import static org.springframework.http.HttpHeaders.ORIGIN;
import static org.springframework.http.HttpMethod.DELETE;
import static org.springframework.http.HttpMethod.GET;
import static org.springframework.http.HttpMethod.OPTIONS;
import static org.springframework.http.HttpMethod.PATCH;
import static org.springframework.http.HttpMethod.POST;
import static org.springframework.http.HttpMethod.PUT;

@Configuration
public class CorsConfig {


    @Bean
    public CorsFilter corsFilter() {
        var urlBasedCorsConfigurationSource = new UrlBasedCorsConfigurationSource();
        var corsConfiguration = new CorsConfiguration();

        // Autoriser les cookies et les informations d'identification
        corsConfiguration.setAllowCredentials(true);

        // Définir les origines autorisées
        corsConfiguration.setAllowedOrigins(List.of("http://localhost:3000"));

        // Définir les en-têtes autorisés dans les requêtes
        corsConfiguration.setAllowedHeaders(List.of(
                ORIGIN,
                ACCESS_CONTROL_ALLOW_ORIGIN,
                CONTENT_TYPE,
                ACCEPT,
                AUTHORIZATION,
                X_REQUESTED_WITH,
                ACCESS_CONTROL_REQUEST_METHOD,
                ACCESS_CONTROL_REQUEST_HEADERS,
                ACCESS_CONTROL_ALLOW_CREDENTIALS
        ));

        // Définir les en-têtes exposés dans la réponse
        corsConfiguration.setExposedHeaders(List.of(
                ORIGIN,
                ACCESS_CONTROL_ALLOW_ORIGIN,
                CONTENT_TYPE,
                ACCEPT,
                AUTHORIZATION,
                X_REQUESTED_WITH,
                ACCESS_CONTROL_REQUEST_METHOD,
                ACCESS_CONTROL_REQUEST_HEADERS,
                ACCESS_CONTROL_ALLOW_CREDENTIALS
        ));

        // Définir les méthodes HTTP autorisées
        corsConfiguration.setAllowedMethods(List.of(
                GET.name(),
                POST.name(),
                PUT.name(),
                PATCH.name(),
                DELETE.name(),
                OPTIONS.name()
        ));

        // Enregistrer la configuration CORS
        urlBasedCorsConfigurationSource.registerCorsConfiguration("/**", corsConfiguration);

        // Retourner le filtre CORS
        return new CorsFilter(urlBasedCorsConfigurationSource);
    }
}
