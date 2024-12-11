package com.example.triplan.domain.placeadd.entity;

import com.example.triplan.common.BaseEntity;
import com.example.triplan.domain.account.entity.Account;
import com.example.triplan.domain.place.entity.Place;
import com.example.triplan.domain.plan.entity.Plan;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PlaceAdd extends BaseEntity {
    @Column(name = "placeAddName", nullable = false)
    private String placeAddName;

    @Column(name = "placeAddAddress", nullable = false)
    private String placeAddAddress;

    @Column(name = "placeLatitude", nullable = false)
    private String placeLatitude;

    @Column(name = "placeLongitude", nullable = false)
    private String placeLongitude;

    @Column(name = "memo", nullable = false)
    private String memo;

}
