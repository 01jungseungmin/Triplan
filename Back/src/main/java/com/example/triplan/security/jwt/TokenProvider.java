package com.example.triplan.security.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.*;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
//JWT(JSON Web Tokens)를 생성, 인증 및 검증
public class TokenProvider implements InitializingBean {
    private final Logger logger = LoggerFactory.getLogger(TokenProvider.class); //Logger 객체를 사용하여 로그를 기록
    private static final String AUTHORITIES_KEY = "auth"; //JWT의 권한을 나타내는 키

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.access-token-validity-in-seconds}")
    private long accessTokenValidityInSeconds;

    @Value("${jwt.refresh-token-validity-in-seconds}")
    private long refreshTokenValidityInSeconds;

    private final RedisTokenService redisTokenService;

    private Key key;


    @Override
    public void afterPropertiesSet() {
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        if (keyBytes.length < 64) {
            this.key = Keys.secretKeyFor(SignatureAlgorithm.HS512);
            logger.warn("Provided secret key is weak. Generated new key.");
        } else {
            this.key = Keys.hmacShaKeyFor(keyBytes); // 키가 512비트 미만인 경우, 새로운 시크릿 키 생성
        }
    }

    public String createAccessToken(Authentication authentication) {
        String authorities = authentication.getAuthorities().stream() //사용자의 권한 정보를 스트림으로 받아오기
                .map(GrantedAuthority::getAuthority) //map을 사용하여 각 권한 객체(GrantedAuthority)의 권한 이름을 가져오기
                .collect(Collectors.joining(",")); //권한 이름들을 쉼표로 구분된 하나의 문자열로 합치기

        Date validity = new Date(System.currentTimeMillis() + accessTokenValidityInSeconds * 1000); //현재 시간에 토큰의 유효 시간을 더한 시간을 만료 시간

        return Jwts.builder() //JWT를 생성
                .setSubject(authentication.getName()) //토큰의 주체를 설정
                .claim(AUTHORITIES_KEY, authorities) //권한 정보를 토큰에 저장
                .signWith(key, SignatureAlgorithm.HS512) //HMAC SHA512 알고리즘과 비밀 키를 이용하여 토큰을 서명
                .setExpiration(validity) //토큰의 만료 시간을 설정
                .compact(); //토큰을 문자열 형태로 반환
    }

    public String createRefreshToken(String email) {
        Date validity = new Date(System.currentTimeMillis() + refreshTokenValidityInSeconds * 1000);

        return Jwts.builder()
                .setSubject(email)
                .signWith(key, SignatureAlgorithm.HS512)
                .setExpiration(validity)
                .compact();
    }

    public TokenDto generateTokenDto(Authentication authentication) {
        String accessToken = createAccessToken(authentication);
        String refreshToken = createRefreshToken(authentication.getName());

        redisTokenService.saveRefreshToken(authentication.getName(), refreshToken, refreshTokenValidityInSeconds);
        // Redis에 저장(Key = "RT:<email>", Value = refreshToken, TTL = 유효시간) -> 이후 토큰 재발급 요청 시 서버가 유효한 refresh token인지 확인 가능

        return TokenDto.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }


    // 토큰으로 클레임을 만들고 이를 이용해 유저 객체를 만들어서 최종적으로 authentication 객체를 리턴
    public Authentication getAuthentication(String token) {
        Claims claims = parseClaims(token);

        Collection<? extends GrantedAuthority> authorities = Optional.ofNullable(claims.get(AUTHORITIES_KEY))
                .map(auth -> Arrays.stream(auth.toString().split(","))
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList()))// 클레임으로부터 권한 정보를 추출하여 GrantedAuthority 객체의 컬렉션으로 변환
                .orElse(Collections.emptyList());

        User principal = new User(claims.getSubject(), "", authorities); //User 객체를 생성, claims.getSubject()는 토큰의 주체(사용자 이메일)를 반환

        return new UsernamePasswordAuthenticationToken(principal, token, authorities); //Authentication 객체(Spring Security에서 사용자의 인증 정보) 반환
    }

    //JWT 토큰으로부터 클레임(JWT 토큰의 페이로드에 담긴 정보 == 토큰의 주체, 발급자, 수신자 등)을 추출
    private Claims parseClaims(String token) {
        try {
            return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
        } catch (ExpiredJwtException e) {
            return e.getClaims();
        }
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            logger.info("Invalid JWT: {}", e.getMessage());
        }
        return false;
    }

    public long getTokenRemainingTime(String token) {
        Date expiration = parseClaims(token).getExpiration();
        return (expiration.getTime() - System.currentTimeMillis()) / 1000;
    }

    public TokenDto refreshAccessToken(String refreshToken) {
        if (!validateToken(refreshToken)) {
            throw new RuntimeException("Invalid Refresh Token");
        }

        String email = parseClaims(refreshToken).getSubject();
        String stored = redisTokenService.getRefreshToken(email);

        if (!refreshToken.equals(stored)) {
            throw new RuntimeException("Token mismatch");
        }

        Authentication authentication = new UsernamePasswordAuthenticationToken(email, null, List.of());
        String newAccessToken = createAccessToken(authentication);

        return TokenDto.builder()
                .accessToken(newAccessToken)
                .refreshToken(refreshToken)
                .build();
    }

    public void logout(String accessToken, String email) {
        redisTokenService.deleteRefreshToken(email);
        long remaining = getTokenRemainingTime(accessToken);
        redisTokenService.blacklistAccessToken(accessToken, remaining);
    }
}
