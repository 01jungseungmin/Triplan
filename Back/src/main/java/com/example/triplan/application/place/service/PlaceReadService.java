package com.example.triplan.application.place.service;

import com.example.triplan.application.place.dto.response.PlaceListDetailResponse;
import com.example.triplan.application.place.dto.response.PlaceListResponse;
import com.example.triplan.domain.place.entity.Place;
import com.example.triplan.domain.place.repository.PlaceRepository;
import com.example.triplan.exception.ErrorCode;
import com.example.triplan.exception.TriplanException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PlaceReadService {
    private final PlaceRepository placeRepository;

    //장소 전체 조회
    public List<PlaceListResponse> findAll(){
        List<Place> places = placeRepository.findAll();
        return places.stream()
                .map(place -> new PlaceListResponse(place.getId(), place.getPlaceCategory(),
                        place.getPlaceName(), place.getPlaceAddress(), place.getPlaceNumber(), place.getCount()))
                .collect(Collectors.toList());
    }

    //장소 상세 조회
    public PlaceListDetailResponse getPlaceDetails(Long placeId){
        Place place = placeRepository.findById(placeId).orElseThrow(() -> new TriplanException(ErrorCode.PLACE_NOT_FOUND));
        return new PlaceListDetailResponse(place.getId(), place.getPlaceName(), place.getPlaceAddress(), place.getPlaceCategory() ,place.getPlaceNumber(), place.getPlaceBusinessHours(),
                place.getPlaceLatitude(), place.getPlaceLongitude());
    }
}
