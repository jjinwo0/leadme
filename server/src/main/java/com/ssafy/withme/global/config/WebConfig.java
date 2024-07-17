package com.ssafy.withme.global.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@ComponentScan("com.ssafy.withme")
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {

        registry
                .addMapping("/**")
                .allowedOrigins("http://localhost:8080", "http://localhost:5173")
                .allowCredentials(true)
                .allowedHeaders("*")
                .allowedMethods("GET", "POST")
                .maxAge(3600);
    }
}
