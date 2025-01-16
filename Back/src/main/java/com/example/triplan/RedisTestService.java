package com.example.triplan;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
public class RedisTestService {

    @Autowired
    private StringRedisTemplate redisTemplate;

    public String testRedisConnection() {
        try {
            // Redis에 데이터 저장
            redisTemplate.opsForValue().set("testKey", "Hello Redis!");

            // Redis에서 데이터 가져오기
            String value = redisTemplate.opsForValue().get("testKey");

            return "Redis 연결 성공! 값: " + value;
        } catch (Exception e) {
            e.printStackTrace();
            return "Redis 연결 실패: " + e.getMessage();
        }
    }
}