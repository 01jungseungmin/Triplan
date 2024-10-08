package com.example.triplan.domain.place.entity;

import com.example.triplan.common.BaseEntity;
import com.example.triplan.domain.place.enums.PlaceCategory;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Entity
@Getter
@AllArgsConstructor
public class Place extends BaseEntity {
    @Column(name = "placeName", nullable = false)
    private String placeName;

    @Column(name = "placeAddress", nullable = false)
    private String placeAddress;

    @Column(name = "placeLatitude", nullable = false)
    private String placeLatitude;

    @Column(name = "placeLongitude", nullable = false)
    private String placeLongitude;

    @Column(name = "placeNumber")
    private String placeNumber;

    @Column(name = "placeHoliday")
    private String placeHoliday;

    @Column(name = "placeBusinessHours")
    private String placeBusinessHours;

    @Enumerated(EnumType.STRING)
    @Schema(description = "장소 카테고리", example = "CAFE,RESTAURANT,SHOPPING,TOUR,ETC,REGION")
    @Column(name ="placeCategory", nullable = false)
    private PlaceCategory placeCategory;
}
