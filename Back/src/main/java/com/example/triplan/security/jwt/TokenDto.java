    package com.example.triplan.security.jwt;

    import lombok.*;

    @Getter
    @Setter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public class TokenDto {
        private String accessToken;
        private String refreshToken;
        private String tokenType = "Bearer";
    }