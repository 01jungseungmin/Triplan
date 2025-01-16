package com.example.triplan.application.place.service;

import com.example.triplan.application.place.dto.response.PlaceListDetailResponse;
import com.example.triplan.application.place.dto.response.PlaceListResponse;
import com.example.triplan.domain.place.entity.Place;
import com.example.triplan.domain.place.repository.PlaceRepository;
import com.example.triplan.exception.ErrorCode;
import com.example.triplan.exception.TriplanException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PlaceReadService {
    private final PlaceRepository placeRepository;
    private final StringRedisTemplate redisTemplate;
    private final ObjectMapper objectMapper;

    private static final String REDIS_PLACE_KEY = "all_places";

    // 전체 장소 조회
    public List<PlaceListResponse> findAll() {
        try {
            // Redis에서 데이터 조회
            String cachedPlaces = redisTemplate.opsForValue().get(REDIS_PLACE_KEY);
            if (cachedPlaces != null) {
                System.out.println("Redis에서 데이터 조회 성공: " + cachedPlaces); // Redis 조회 성공 여부 출력
                return objectMapper.readValue(cachedPlaces, new TypeReference<List<PlaceListResponse>>() {});
            }

            // Redis에 데이터가 없으면 DB에서 조회
            System.out.println("Redis에 데이터가 없어서 DB에서 조회 중...");
            List<Place> places = placeRepository.findAll();
            List<PlaceListResponse> response = places.stream()
                    .map(place -> new PlaceListResponse(place.getId(), place.getPlaceCategory(),
                            place.getPlaceName(), place.getPlaceAddress(), place.getPlaceNumber(),
                            place.getCount(), place.getImgUrl()))
                    .collect(Collectors.toList());

            // 데이터를 Redis에 저장
            redisTemplate.opsForValue().set(REDIS_PLACE_KEY, objectMapper.writeValueAsString(response), 1, TimeUnit.HOURS);
            System.out.println("Redis에 데이터 저장 완료");

            return response;
        } catch (Exception e) {
            e.printStackTrace(); // 예외 발생 시 스택 트레이스 출력
            throw new RuntimeException("Redis에서 데이터를 처리하는 중 오류가 발생했습니다.", e);
        }
    }


    //장소 상세 조회
    public PlaceListDetailResponse getPlaceDetails(Long placeId){
        Place place = placeRepository.findById(placeId).orElseThrow(() -> new TriplanException(ErrorCode.PLACE_NOT_FOUND));
        return new PlaceListDetailResponse(place.getId(), place.getPlaceName(), place.getPlaceAddress(), place.getPlaceCategory() ,place.getPlaceNumber(), place.getPlaceBusinessHours(),
                place.getPlaceLatitude(), place.getPlaceLongitude(),place.getPlaceHoliday(),place.getCount(),place.getImgUrl());
    }
}