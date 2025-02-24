package com.example.triplan.domain.plan.entity;

import com.example.triplan.common.BaseEntity;
import com.example.triplan.domain.board.entity.Board;
import com.example.triplan.domain.crew.entity.Crew;
import com.example.triplan.domain.plan.enums.PlaceType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
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
}
