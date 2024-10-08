package com.example.triplan.domain.place.entity;

import com.example.triplan.common.BaseEntity;
import com.example.triplan.domain.account.entity.Account;
import com.example.triplan.domain.place.enums.PlaceCategory;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
public class Place extends BaseEntity {
    private String placeName;

    private String placeAddress;

    private String conLatitude;

    private String conLongitude;

    private String placeNumber;

    private String placeBusinessHours;

    @Enumerated(EnumType.STRING)
    private PlaceCategory placeCategory;
}
