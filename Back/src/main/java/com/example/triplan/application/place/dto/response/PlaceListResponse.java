package com.example.triplan.application.place.dto.response;

import com.example.triplan.domain.place.enums.PlaceCategory;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PlaceListResponse {

    @Schema(description = "장소 Id", example = "1")
    private Long placeId;

    @Schema(description = "장소 카테고리", example = " CAFE,RESTAURANT,SHOPPING,TOUR,ACCOMMODATION,ETC,REGION")
    private PlaceCategory placeCategory;

    @Schema(description = "장소 이름", example = "00카페")
    private String placeName;

    @Schema(description = "장소 주소", example = "경상북도 경주시 교촌길 2")
    private String placeAddress;

    @Schema(description = "장소 전화번호", example = "010-1234-1234")
    private String placeNumber;

    @Schema(description = "장소 count", example = "1")
    private Integer count;

//    @Schema(description = "이미지 url", example = "link")
//    private String imgUrl;
}
