package com.example.triplan.application.crew.dto.response;

import com.example.triplan.domain.crew.entity.Crew;
import com.example.triplan.domain.crew.entity.CrewList;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Getter
public class CrewResponse {
    private Long crewId;
    private String crewName;
    private LocalDate planStartDate;
    private LocalDate planEndDate;
    private Long accountId; // Account ID만 포함
    private List<Long> memberAccountIds; // ACCEPT 상태인 멤버들의 Account ID 리스트
    public CrewResponse(Crew crew) {
        this.crewId = crew.getId();
        this.crewName = crew.getCrewName();
        this.planStartDate = crew.getPlanStartDate();
        this.planEndDate = crew.getPlanEndDate();
        this.accountId = crew.getAccount().getId(); // Account ID만 가져옴
    }

    public CrewResponse(Crew crew, List<CrewList> members) {
        this.crewId = crew.getId();
        this.crewName = crew.getCrewName();
        this.planStartDate = crew.getPlanStartDate();
        this.planEndDate = crew.getPlanEndDate();
        this.accountId = crew.getAccount().getId(); // Account ID만 가져옴
        this.memberAccountIds = members.stream()
                .map(member -> member.getAccount().getId()) // ACCEPT 상태인 멤버들의 Account ID 수집
                .collect(Collectors.toList());
    }
}