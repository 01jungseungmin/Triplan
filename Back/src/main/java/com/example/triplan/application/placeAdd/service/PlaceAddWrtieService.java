package com.example.triplan.application.placeAdd.service;

import com.example.triplan.application.placeAdd.dto.request.SetAccountPlaceRequest;
import com.example.triplan.domain.placeadd.repository.PlaceAddRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class PlaceAddWrtieService {
    private final PlaceAddRepository placeAddRepository;

    //사용자 장소 등록
    public String setAccountPlace(Long accountId, SetAccountPlaceRequest setAccountPlaceRequest){
        return "장소 등록 완료";
    }
}
