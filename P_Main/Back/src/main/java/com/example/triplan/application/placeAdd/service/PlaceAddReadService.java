package com.example.triplan.application.placeAdd.service;

import com.example.triplan.application.placeAdd.dto.response.PlaceAddResponse;
import com.example.triplan.domain.placeadd.repository.PlaceAddRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PlaceAddReadService {
    private final PlaceAddRepository placeAddRepository;

    //사용자 장소 조회
    public PlaceAddResponse findPlaceAdd(Long accountId, Long planAddId){
        return null;
    }
}
