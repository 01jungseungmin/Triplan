package com.example.triplan;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RedisTestController {

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
    public String testRedisConnection() {
        boolean result = redisTestService.testConnection();
        return result ? "Redis is working properly!" : "Redis connection failed!";
    }
}
