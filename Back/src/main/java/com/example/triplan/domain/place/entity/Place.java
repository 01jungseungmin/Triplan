package com.example.triplan.domain.place.entity;

import com.example.triplan.common.BaseEntity;
import com.example.triplan.domain.account.entity.Account;
import com.example.triplan.domain.place.enums.PlaceCategory;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
public class Place extends BaseEntity {
    @Column(name = "placeName", nullable = false)
    private String placeName;

    @Column(name = "placeAddress", nullable = false)
    private String placeAddress;

    @Column(name = "placeLatitude", nullable = false)
    private String placeLatitude;

    @Column(name = "placeLongitude", nullable = false)
    private String placeLongitude;

    @Column(name = "placeNumber", nullable = false)
    private String placeNumber;

    @Column(name = "placeHoliday", nullable = false)
    private String placeHoliday;

    @Column(name = "placeBusinessHours", nullable = false)
    private String placeBusinessHours;

    @Enumerated(EnumType.STRING)
    @Schema(description = "장소 카테고리", example = "CAFE,RESTAURANT,SHOPPING,TOUR,ETC,REGION")
    @Column(name ="placeCategory", nullable = false)
    private PlaceCategory placeCategory;
}
