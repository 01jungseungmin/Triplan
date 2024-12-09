package com.example.triplan.domain.alarm.entity;

import com.example.triplan.common.BaseEntity;
import com.example.triplan.domain.account.entity.Account;
import com.example.triplan.domain.alarm.enums.AlarmType;
import com.example.triplan.domain.crew.entity.CrewList;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Alarm extends BaseEntity {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_id")
    private Account account;

    @ManyToOne(fetch = FetchType.LAZY) // cascade 추가
    @JoinColumn(name = "crew_list")
    private CrewList crewList;

    @Enumerated(EnumType.STRING)
    @Schema(description = "알림 타입", example = "INVITE")
    @Column(name ="alarmType", nullable = false)
    private AlarmType alarmType;

    public Alarm(AlarmType alarmType, Account account, CrewList crewList) {
        this.alarmType = alarmType;
        this.account = account;
        this.crewList = crewList;
    }
}