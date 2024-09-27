package com.example.triplan.domain.alarm.entity;

import com.example.triplan.common.BaseEntity;
import com.example.triplan.domain.alarm.enums.AlarmType;
import com.example.triplan.domain.crew.entity.Crew;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
public class Alarm extends BaseEntity {
    @ManyToOne
    @JoinColumn(name = "crew_id")
    private Crew crew;

    @Enumerated(EnumType.STRING)
    @Schema(description = "그룹 초대 수락 상태값", example = "ACCEPT, DECLINE, WAIT")
    @Column(name ="alarmType", nullable = false)
    private AlarmType alarmType;

    private String test;
}
