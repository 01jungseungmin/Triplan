package com.example.triplan.application.crew.dto.request;

import com.example.triplan.domain.account.entity.Account;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class CrewUpdateRequest {
    @Schema(description = "여행 이름", example = "제주도 여행")
    private String crewName;

    @Schema(description = "여행 시작일", example = "2024-11-21")
    private LocalDate planStartDate;

    @Schema(description = "여행 종료일", example = "2024-11-23")
    private LocalDate planEndDate;
}
