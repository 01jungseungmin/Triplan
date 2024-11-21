package com.example.triplan.application.plan.dto.request;

import com.example.triplan.domain.plan.enums.PlaceType;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
public class PlanRequest {
    private LocalDate planDate;
    private LocalTime planStartTime;
    private String planMemo;
    private Long refId;
    private PlaceType placeType;
    private Long crewId;
}