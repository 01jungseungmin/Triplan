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
    public Place() {}
}
