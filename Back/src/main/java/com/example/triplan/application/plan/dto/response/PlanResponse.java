package com.example.triplan.application.plan.dto.response;

import com.example.triplan.domain.crew.entity.Crew;
import com.example.triplan.domain.place.entity.Place;
import com.example.triplan.domain.plan.entity.Plan;

import java.time.LocalDate;
import java.time.LocalTime;

public class PlanResponse {
    private LocalDate planDate;
    private LocalTime planStartTime;
    private String planMemo;
    private Long placeId;
    private Long crewId;
}


