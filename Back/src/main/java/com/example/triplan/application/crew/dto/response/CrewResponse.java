package com.example.triplan.application.crew.dto.response;

import com.example.triplan.domain.crew.entity.Crew;
import com.example.triplan.domain.crew.entity.CrewList;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Getter
public class CrewResponse {

    @Schema(description = "여행 Id", example = "1")
    private Long crewId;

    @Schema(description = "여행 이름", example = "제주도 여행")
    private String crewName;

    @Schema(description = "여행 시작일", example = "2024-11-21")
    private LocalDate planStartDate;

    @Schema(description = "여행 종료일", example = "2024-11-23")
    private LocalDate planEndDate;

    @Schema(description = "회원Id", example = "1")
    private Long accountId; // Account ID만 포함

    @Schema(description = "수락한 회원의 Id 리스트", example = "[1,2,3]")
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