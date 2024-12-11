package com.example.triplan.application.alarm.dto.request;

import com.example.triplan.domain.crew.enums.IsAccept;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

@Getter
public class AlarmRequest {
    @Schema(description = "알림 id", example = "1")
    private Long alarmId;

    @Schema(description = "그룹 id", example = "1")
    private Long crewId;

    @Schema(description = "그룹 초대 상태값", example = "ACCEPT,DECLINE,WAIT")
    private IsAccept inviteType;
}
