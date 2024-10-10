package com.example.triplan.application.api.service;

import com.example.triplan.domain.place.entity.Place;
import com.example.triplan.domain.place.enums.PlaceCategory;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class OpenApiDto {

    @Schema(description = "장소 이름", example = "00카페")
    private String placeName;

    @Schema(description = "장소 주소", example = "경기도 부천시 원미구 00")
    private String placeAddress;

    @Schema(description = "위도", example = "12.123456789")
    private String conLatitude;

    @Schema(description = "경도", example = "123.456789")
    private String conLongitude;

    @Schema(description = "장소 전화번호", example = "010-1234-5678")
    private String placeNumber;

    @Schema(description = "장소 영업 시간", example = "10:00-22:00")
    private String placeBusinessHours;

    @Schema(description = "장소 카테고리", example = "CAFE,RESTAURANT,SHOPPING,TOUR,ACCOMMODATION,ETC,REGION")
    private PlaceCategory placeCategory;

    public Place toEntity() {
        return Place.builder()
                .placeName(placeName)
                .placeAddress(placeAddress)
                .placeLatitude(conLatitude)
                .placeLongitude(conLongitude)
                .placeNumber(placeNumber)
                .placeBusinessHours(placeBusinessHours)
                .placeCategory(placeCategory)
                .build();
    }
}
