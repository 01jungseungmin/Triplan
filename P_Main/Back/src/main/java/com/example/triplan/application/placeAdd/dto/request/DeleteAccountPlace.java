package com.example.triplan.application.placeAdd.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class DeleteAccountPlace {
    @Schema(description = "포함 되어 있는 그룹 id", example = "1")
    private Long crewId;

    @Schema(description = "일정 id", example = "1")
    private Long planId;

    @Schema(description = "장소 추가 id", example = "1")
    private Long placeAddId;
}
