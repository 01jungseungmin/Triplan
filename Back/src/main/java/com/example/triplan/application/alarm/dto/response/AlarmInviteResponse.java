package com.example.triplan.application.alarm.dto.response;

import com.example.triplan.domain.crew.enums.IsAccept;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AlarmInviteResponse {
    @Schema(description = "회원 Id", example = "1")
    private Long accountId;

    @Schema(description = "그룹 id", example = "1")
    private Long crewId;

    @Schema(description = "그룹 초대 상태값", example = "ACCEPT,DECLINE,WAIT")
    private IsAccept isAccept;
}
