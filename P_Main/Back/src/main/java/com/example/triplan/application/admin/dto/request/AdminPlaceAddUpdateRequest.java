package com.example.triplan.application.admin.dto.request;


import com.example.triplan.domain.place.enums.PlaceCategory;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminPlaceAddUpdateRequest {

    @Schema(description = "장소 id", example = "1")
    private Long placeId;

    @Schema(description = "장소 이름", example = "00카페")
    private String placeAddName;

    @Schema(description = "장소 주소", example = "경주시 양정로 254-12")
    private String placeAddAddress;

    @Schema(description = "장소 전화번호", example = "010-1234-1234")
    private String placeNumber;

    @Schema(description = "영업 시간", example = "10:00-22:00")
    private String placeBusinessHours;

    @Schema(description = "휴무일", example = "연중무휴")
    private String placeHoliday;
}
