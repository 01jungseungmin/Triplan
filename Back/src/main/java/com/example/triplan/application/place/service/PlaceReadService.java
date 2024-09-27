package com.example.triplan.application.place.service;

import com.example.triplan.application.place.dto.response.PlaceListDetailResponse;
import com.example.triplan.application.place.dto.response.PlaceListResponse;
import com.example.triplan.domain.place.repository.PlaceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PlaceReadService {
    private final PlaceRepository placeRepository;

    //장소 전체 조회
    public PlaceListResponse findAll(){
        return null;
    }

    //장소 상세 조회
    public PlaceListDetailResponse getPlaceDetails(Long placeId){
        return null;
    }
}
