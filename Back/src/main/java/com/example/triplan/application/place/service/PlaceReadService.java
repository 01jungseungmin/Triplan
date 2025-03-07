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
    private static final String REDIS_PLACE_DETAIL_KEY = "place_details_";
    private static final long CACHE_EXPIRATION = 3600; // 1시간 캐싱 (초 단위)

    // 전체 장소 조회
    public List<PlaceListResponse> findAll() {
        try {
            // Redis에서 데이터 조회
            String cachedPlaces = redisTemplate.opsForValue().get(REDIS_PLACE_KEY);
            if (cachedPlaces != null) {
                // Redis에 데이터가 있으면 반환
                return objectMapper.readValue(cachedPlaces, new TypeReference<List<PlaceListResponse>>() {});
            }

            // Redis에 데이터가 없으면 DB에서 조회
            List<Place> places = placeRepository.findAll();
            List<PlaceListResponse> response = places.stream()
                    .map(place -> new PlaceListResponse(place.getId(), place.getPlaceCategory(),
                            place.getPlaceName(), place.getPlaceAddress(), place.getPlaceNumber(),
                            place.getCount(), place.getImgUrl()))
                    .collect(Collectors.toList());

            // 데이터를 Redis에 저장 (1시간 동안 캐싱)
            redisTemplate.opsForValue().set(REDIS_PLACE_KEY, objectMapper.writeValueAsString(response), CACHE_EXPIRATION, TimeUnit.SECONDS);

            return response;
        } catch (Exception e) {
            throw new RuntimeException("Redis에서 데이터를 처리하는 중 오류가 발생했습니다.", e);
        }
    }

    public PlaceListDetailResponse getPlaceDetails(Long placeId) {
        String redisKey = REDIS_PLACE_DETAIL_KEY + placeId;
        try {
            // ✅ Redis에서 데이터 조회
            String cachedDetailPlace = redisTemplate.opsForValue().get(redisKey);
            if (cachedDetailPlace != null) {
                return objectMapper.readValue(cachedDetailPlace, PlaceListDetailResponse.class);
            }

            // ✅ Redis에 데이터가 없으면 DB에서 조회
            Place place = placeRepository.findById(placeId)
                    .orElseThrow(() -> new TriplanException(ErrorCode.PLACE_NOT_FOUND));

            PlaceListDetailResponse response = new PlaceListDetailResponse(
                    place.getId(), place.getPlaceName(), place.getPlaceAddress(),
                    place.getPlaceCategory(), place.getPlaceNumber(), place.getPlaceBusinessHours(),
                    place.getPlaceLatitude(), place.getPlaceLongitude(), place.getPlaceHoliday(),
                    place.getCount(), place.getImgUrl()
            );


            redisTemplate.opsForValue().set(redisKey, objectMapper.writeValueAsString(response), CACHE_EXPIRATION, TimeUnit.SECONDS);

            return response;
        } catch (Exception e) {
            throw new RuntimeException("Redis 캐싱 중 오류 발생", e);
        }
    }


}