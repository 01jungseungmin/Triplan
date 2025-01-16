package com.example.triplan;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
public class RedisTestService {

    @Autowired
    private StringRedisTemplate redisTemplate;

    // Redis에 데이터를 저장하는 메서드
    public void saveValue(String key, String value) {
        redisTemplate.opsForValue().set(key, value, 10, TimeUnit.MINUTES); // 10분 만료
    }

    // Redis에서 데이터를 조회하는 메서드
    public String getValue(String key) {
        return redisTemplate.opsForValue().get(key);
    }

    // Redis 연결 테스트 메서드
    public boolean testConnection() {
        try {
            redisTemplate.opsForValue().set("redis-test-key", "test-value", 1, TimeUnit.MINUTES);
            String result = redisTemplate.opsForValue().get("redis-test-key");
            return "test-value".equals(result); // Redis에 데이터 저장/조회 성공 여부 확인
        } catch (Exception e) {
            e.printStackTrace();
            return false; // Redis 연결 실패
        }
    }
}
