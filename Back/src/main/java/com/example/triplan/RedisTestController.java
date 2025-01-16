package com.example.triplan;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RedisTestController {


    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    @Autowired
    private RedisTestService redisTestService;

    @GetMapping("/redis/save")
    public String saveToRedis(@RequestParam String key, @RequestParam String value) {
        redisTestService.saveValue(key, value);
        return "Saved key: " + key + ", value: " + value;
    }

    @GetMapping("/redis/get")
    public String getFromRedis(@RequestParam String key) {
        String value = redisTestService.getValue(key);
        return value != null ? "Value for key " + key + ": " + value : "Key not found!";
    }

    @GetMapping("/redis/test")
    public ResponseEntity<String> getRedisTestData() {
        String value = redisTemplate.opsForValue().get("testKey"); // Redis에서 값 가져오기
        return ResponseEntity.ok(value != null ? value : "No data found in Redis");
    }
}
