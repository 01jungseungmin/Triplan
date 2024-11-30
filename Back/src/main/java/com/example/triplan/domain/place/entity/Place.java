package com.example.triplan.domain.place.entity;

import com.example.triplan.common.BaseEntity;
import com.example.triplan.domain.place.enums.PlaceCategory;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
public class Place extends BaseEntity {
    private String placeName;

    private String placeAddress;

    private String placeLatitude;

    private String placeLongitude;

    private String placeNumber;

    private String placeHoliday;

    private String placeBusinessHours;

    @Enumerated(EnumType.STRING)
    private PlaceCategory placeCategory;

    private String imgUrl;

    public Place() {}

    public void setImgUrl(String imgUrl){
        this.imgUrl = imgUrl;
    }

    public void setPlace(String placeName, String placeAddress, String placeNumber, String placeHoliday, String placeBusinessHours) {
        this.placeName = placeName;
        this.placeAddress = placeAddress;
        this.placeNumber = placeNumber;
        this.placeHoliday = placeHoliday;
        this.placeBusinessHours = placeBusinessHours;
    }
}
