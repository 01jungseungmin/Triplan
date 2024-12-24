package com.example.triplan.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        // SPA 경로 매핑
        registry.addViewController("/{spring:[\\w\\-]+}").setViewName("forward:/");
        registry.addViewController("/{spring:[\\w\\-]+}/{spring:[\\w\\-]+}").setViewName("forward:/");
        registry.addViewController("/{spring:[\\w\\-]+}/{spring:[\\w\\-]+}/{spring:[\\w\\-]+}").setViewName("forward:/");
    }
}
