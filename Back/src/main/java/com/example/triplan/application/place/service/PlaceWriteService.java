package com.example.triplan.application.place.service;

import com.example.triplan.application.place.dto.request.SetAdminPlaceRequest;
import com.example.triplan.domain.plan.repository.PlanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class PlaceWriteService {
    private final PlanRepository planRepository;

    //관리자 장소 등록
    public String setAdminPlace(Long accountId, SetAdminPlaceRequest setAdminPlaceRequest){
        return "관리자 장소 등록 완료";
    }

    //관리자 장소 삭제
    public String deleteAdminPlace(Long accountId, Long placeId){
        return "관리자 장소 삭제 완료";
    }


}
