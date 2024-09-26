package com.example.triplan.domain.plan.entity;

import com.example.triplan.common.BaseEntity;
import com.example.triplan.domain.crew.entity.Crew;
import com.example.triplan.domain.place.entity.Place;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Getter
public class Plan extends BaseEntity {
    @Column(name = "planDate", nullable = false)
    private LocalDate planDate;

    @Column(name = "planStartTime", nullable = false)
    private LocalTime planStartTime;

    @Column(name = "planMemo", nullable = false)
    private String planMemo;

    @ManyToOne
    @JoinColumn(name = "place_id")
    private Place place;

    @ManyToOne
    @JoinColumn(name = "crew_id")
    private Crew crew;
}