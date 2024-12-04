package com.example.triplan.application.plan.dto.response;

import com.example.triplan.domain.plan.enums.PlaceType;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@AllArgsConstructor
public class PlanResponse {
    private LocalDate planDate;
    private LocalTime planStartTime;
    private String planMemo;
    private Long refId;
    private PlaceType placeType;
    private Long crewId;
    private String placeName; // 장소 이름 추가
    private String placeAddress; // 장소 주소 추가
}


