package com.example.triplan.domain.plan.entity;

import com.example.triplan.common.BaseEntity;
import com.example.triplan.domain.crew.entity.Crew;
import com.example.triplan.domain.place.entity.Place;
import com.example.triplan.domain.placeadd.entity.PlaceAdd;
import com.example.triplan.domain.plan.enums.PlaceType;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Plan extends BaseEntity {
    @Column(name = "planDate", nullable = false)
    private LocalDate planDate;

    @Column(name = "planStartTime", nullable = false)
    private LocalTime planStartTime;

    @Column(name = "planMemo", nullable = false)
    private String planMemo;

    @ManyToOne
    @JoinColumn(name = "crew_id")
    private Crew crew;

    @Column(name = "refId", nullable = false)
    private Long refId;

    @Enumerated(EnumType.STRING)
    private PlaceType placeType;


    public Plan(LocalDate planDate, LocalTime planStartTime, String planMemo, Crew crew) {
        this.planDate = planDate;
        this.planStartTime = planStartTime;
        this.planMemo = planMemo;
        this.place = place;
        this.crew = crew;
    }
}
