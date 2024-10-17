package com.example.triplan.application.plan.dto.request;

import com.example.triplan.domain.crew.entity.Crew;
import com.example.triplan.domain.place.entity.Place;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
public class PlanRequest {
    private LocalDate planDate;
    private LocalTime planStartTime;
    private String planMemo;
    private Long placeId;
    private Long crewId;
}