package com.example.triplan.application.plan.dto.response;

import com.example.triplan.domain.place.entity.Place;
import com.example.triplan.domain.place.repository.PlaceRepository;
import com.example.triplan.domain.placeadd.entity.PlaceAdd;
import com.example.triplan.domain.placeadd.repository.PlaceAddRepository;
import com.example.triplan.domain.plan.entity.Plan;
import com.example.triplan.domain.plan.enums.PlaceType;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@AllArgsConstructor
public class PlanResponse {
    private Long planId;
    private LocalDate planDate;
    private LocalTime planStartTime;
    private String planMemo;
    private Long refId;
    private PlaceType placeType;
    private Long crewId;
    private String placeName; // 장소 이름 추가
    private String placeAddress; // 장소 주소 추가

    public PlanResponse(Plan plan, String placeName, String placeAddress) {
        this.planId = plan.getId();
        this.planDate = plan.getPlanDate();
        this.planStartTime = plan.getPlanStartTime();
        this.planMemo = plan.getPlanMemo();
        this.refId = plan.getRefId();
        this.placeType = plan.getPlaceType();
        this.crewId = plan.getCrew() != null ? plan.getCrew().getId() : null;
        this.placeName = placeName != null ? placeName : "알 수 없음";
        this.placeAddress = placeAddress != null ? placeAddress : "주소 없음";
    }
    public PlanResponse(Plan plan, PlaceRepository placeRepository, PlaceAddRepository placeAddRepository) {
        this.planId = plan.getId();
        this.planDate = plan.getPlanDate();
        this.planStartTime = plan.getPlanStartTime();
        this.planMemo = plan.getPlanMemo();
        this.refId = plan.getRefId();
        this.placeType = plan.getPlaceType();

        // 장소 데이터 조회
        if (plan.getPlaceType() == PlaceType.PLACE) {
            Place place = placeRepository.findById(plan.getRefId()).orElse(null);
            this.placeName = (place != null) ? place.getPlaceName() : "알 수 없음";
            this.placeAddress = (place != null) ? place.getPlaceAddress() : "주소 없음";
        } else if (plan.getPlaceType() == PlaceType.PLACE_ADD) {
            PlaceAdd placeAdd = placeAddRepository.findById(plan.getRefId()).orElse(null);
            this.placeName = (placeAdd != null) ? placeAdd.getPlaceAddName() : "알 수 없음";
            this.placeAddress = (placeAdd != null) ? placeAdd.getPlaceAddAddress() : "주소 없음";
        } else {
            this.placeName = "알 수 없음";
            this.placeAddress = "주소 없음";
        }
    }
}


