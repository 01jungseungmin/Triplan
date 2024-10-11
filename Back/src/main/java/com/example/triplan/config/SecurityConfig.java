package com.example.triplan.config;


import com.example.triplan.security.jwt.TokenProvider;
import com.example.triplan.security.jwt.point.JwtAccessDeniedHandler;
import com.example.triplan.security.jwt.point.JwtAuthenticationEntryPoint;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Collections;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final TokenProvider tokenProvider;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                .csrf(AbstractHttpConfigurer::disable)  //csrf 차단 == token 사용
                .cors(cors -> cors.configurationSource(corsConfigurationSource())) // CORS 설정 추가

                .exceptionHandling((exceptionHandling) -> //컨트롤러의 예외처리
                        exceptionHandling
                                .accessDeniedHandler(jwtAccessDeniedHandler)
                                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                )

                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))  // 세션을 사용하지 않기 때문에 STATELESS로 설정
                .authorizeHttpRequests((authorize) -> authorize
                        .requestMatchers("/","/swagger-ui/**", "/v3/api-docs/**","/login", "/join", "/main", "/api/load").permitAll() // 로그인, 회원가입, 메인 페이지는 모두 접근 가능
                        .anyRequest().authenticated() // 그 외 모든 요청은 인증 필요
                )
                .with(new JwtSecurityConfig(tokenProvider), customizer -> {}); //filterChain 등록



        return http.build();
    }
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOriginPatterns(Collections.singletonList("*")); // 모든 도메인 허용
        config.setAllowedMethods(Collections.singletonList("*")); // 모든 HTTP 메소드 허용
        config.setAllowedHeaders(Collections.singletonList("*")); // 모든 헤더 허용
        config.setAllowCredentials(true); // 인증 정보를 포함한 요청 허용

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config); // 모든 경로에 대해 CORS 설정 적용
        return source;
    }


    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean //스프링 시큐리티 인증 UserSecurityService와 PasswordEncoder가 자동으로 설정
    AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

}