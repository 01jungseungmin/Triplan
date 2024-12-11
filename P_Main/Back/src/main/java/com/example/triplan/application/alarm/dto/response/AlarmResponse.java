package com.example.triplan.application.alarm.dto.response;

import com.example.triplan.domain.alarm.enums.AlarmType;
import com.example.triplan.domain.crew.enums.IsAccept;
import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class AlarmResponse {
    @Schema(description = "알림 id", example = "1")
    private Long alarmId;

    @Schema(description = "그룹 id", example = "1")
    private Long crewId;

    @Schema(description = "알림 타입", example = "INVITE")
    private AlarmType alarmType;

    @Schema(description = "초대 상태", example = "ACCEPT, DECLINE, WAIT")
    private IsAccept isAccept;

    @Schema(description = "일정 이름(그룹 이름)", example = "신나는 강릉 여행 !")
    private String crewName;

    @Schema(description = "초대한 사람", example = "밍밍")
    private String invitePerson;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yy.MM.dd(E)", timezone = "Asia/Seoul")
    @Schema(description = "알림 온 시간", example = "2024-10-10")
    private LocalDateTime localDateTime;

    @Schema(description = "알림 내용", example = "content")
    private String content;
}
