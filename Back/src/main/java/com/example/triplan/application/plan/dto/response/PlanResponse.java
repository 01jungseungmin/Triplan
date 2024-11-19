package com.example.triplan.application.plan.dto.response;

import com.example.triplan.domain.crew.entity.Crew;
import com.example.triplan.domain.place.entity.Place;
import com.example.triplan.domain.plan.entity.Plan;
import com.example.triplan.domain.plan.enums.PlaceType;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
public class PlanResponse {
    private LocalDate planDate;
    private LocalTime planStartTime;
    private String planMemo;
    private Long placeId;
    private Long crewId;
    private PlaceType placeType;

    public PlanResponse(LocalDate planDate, LocalTime planStartTime, String planMemo, Long placeId, PlaceType placeType, Long crewId) {
        this.planDate = planDate;
        this.planStartTime = planStartTime;
        this.planMemo = planMemo;
        this.placeId = placeId;
        this.placeType = placeType;
        this.crewId = crewId;
    }
}


