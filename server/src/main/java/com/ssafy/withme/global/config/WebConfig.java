package com.ssafy.withme.global.config;

import com.ssafy.withme.global.interceptor.AdminAuthorizationInterceptor;
import com.ssafy.withme.global.interceptor.AuthenticationInterceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@ComponentScan("com.ssafy.withme")
@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer {

    private final AuthenticationInterceptor authenticationInterceptor;

    private final AdminAuthorizationInterceptor adminAuthorizationInterceptor;

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

    @Override
    public void addInterceptors(InterceptorRegistry registry) {

        registry.addInterceptor(authenticationInterceptor)
                .addPathPatterns("/leadme/**")
                .excludePathPatterns("/leadme/user/**")
                .order(1);

        registry.addInterceptor(adminAuthorizationInterceptor)
                .addPathPatterns("/admin/**")
                .order(2);
    }
}
