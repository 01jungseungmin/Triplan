package com.example.triplan.application.placeAdd.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
public class SetAccountPlaceRequest {

    @Schema(description = "회원 id", example = "1")
    private Long accountId;

    @Schema(description = "포함 되어 있는 그룹 id", example = "1")
    private Long crewId;

    @Schema(description = "포함 되어 있는 그룹 일정 id", example = "1")
    private Long planId;

    @Schema(description = "나만의 장소 추가 이름", example = "00카페")
    private String placeAddName;

    @Schema(description = "나만의 장소 추가 주소", example = "경주시 양정로 254-12")
    private String placeAddAddress;

    @Schema(description = "나만의 장소 위도", example = "35.8553982001776")
    private String placeLatitude;

    @Schema(description = "나만의 장소 경도", example = "129.225503779861")
    private String placeLongitude;

    @Schema(description = "일정 시간", example = "10:00")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "kk:mm", timezone = "Asia/Seoul")
    private LocalTime planTime;

    @Schema(description = "일정 날짜", example = "2024-11-11")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private LocalDate planDate;

    @Schema(description = "나만의 장소 추가 메모", example = "주말 사람 많아서 미리 예약 필수")
    private String memo;
}
