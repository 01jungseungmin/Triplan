package com.example.triplan.config;


import com.example.triplan.security.jwt.JwtFilter;
import com.example.triplan.security.jwt.RedisTokenService;
import com.example.triplan.security.jwt.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@RequiredArgsConstructor
public class JwtSecurityConfig extends SecurityConfigurerAdapter<DefaultSecurityFilterChain, HttpSecurity> {
    private final TokenProvider tokenProvider;
    private final RedisTokenService redisTokenService;


    @Override
    public void configure(HttpSecurity http) {

        // security 로직에 JwtFilter 등록
        http.addFilterBefore(

                new JwtFilter(tokenProvider,redisTokenService),
                UsernamePasswordAuthenticationFilter.class
        );
    }
}