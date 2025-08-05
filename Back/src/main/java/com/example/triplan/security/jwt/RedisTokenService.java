package com.example.triplan.security.jwt;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class RedisTokenService {

    private final StringRedisTemplate redisTemplate; //Redis에 문자열 기반의 값을 저장하고 조회

    private static final String REFRESH_PREFIX = "RT:"; //이메일을 기준으로 저장된 Refresh Token 키
    private static final String BLACKLIST_PREFIX = "BL:"; //블랙리스트에 등록된 Access Token 키

    public void saveRefreshToken(String email, String token, long expirationSeconds) {
        redisTemplate.opsForValue().set(REFRESH_PREFIX + email, token, expirationSeconds, TimeUnit.SECONDS);
    } //특정 이메일(email) 사용자의 Refresh Token을 Redis에 저장 후 expirationSeconds로 설정한 시간 후 자동 만료되도록 TTL 설정

    public String getRefreshToken(String email) {
        return redisTemplate.opsForValue().get(REFRESH_PREFIX + email);
    } //이메일로 Redis에서 해당 사용자의 Refresh Token을 조회

    public void deleteRefreshToken(String email) {
        redisTemplate.delete(REFRESH_PREFIX + email);
    } //사용자의 Refresh Token을 삭제(로그아웃 시 또는 재로그인 시 기존 토큰 삭제에 사용)

    public void blacklistAccessToken(String token, long expirationSeconds) {
        redisTemplate.opsForValue().set(BLACKLIST_PREFIX + token, "logout", expirationSeconds, TimeUnit.SECONDS);
    } //Access Token을 블랙리스트에 등록(주로 로그아웃 시 해당 토큰을 무효화하기 위해 사용), 블랙리스트 토큰도 TTL 설정으로 자동 삭제

    public boolean isBlacklisted(String token) {
        return Boolean.TRUE.equals(redisTemplate.hasKey(BLACKLIST_PREFIX + token));
    } //주어진 Access Token이 블랙리스트에 등록되어 있는지 확인 후 등록되어 있다면 true, 아니면 false 반환
}
