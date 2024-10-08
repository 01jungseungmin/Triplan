package com.example.triplan.application.crew.dto.response;

import com.example.triplan.domain.crew.entity.Crew;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class CrewResponse {
    private String crewName;
    private LocalDate planStartDate;
    private LocalDate planEndDate;
    private Long accountId; // Account ID만 포함

    public CrewResponse(Crew crew) {
        this.crewName = crew.getCrewName();
        this.planStartDate = crew.getPlanStartDate();
        this.planEndDate = crew.getPlanEndDate();
        this.accountId = crew.getAccount().getId(); // Account ID만 가져옴
    }
}