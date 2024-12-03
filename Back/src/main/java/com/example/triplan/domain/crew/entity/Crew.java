package com.example.triplan.domain.crew.entity;

import com.example.triplan.common.BaseEntity;
import com.example.triplan.domain.account.entity.Account;
import com.example.triplan.domain.crew.enums.IsAccept;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor
public class Crew extends BaseEntity {

    @Column(name = "crewName", nullable = false)
    private String crewName;

    @Column(name = "planStartDate", nullable = false)
    private LocalDate planStartDate;

    @Column(name = "planEndDate", nullable = false)
    private LocalDate planEndDate;

    @ManyToOne
    @JoinColumn(name = "account_id")
    private Account account;

    public Crew(String crewName, LocalDate planStartDate, LocalDate planEndDate,Account account) {
        this.crewName = crewName;
        this.planStartDate = planStartDate;
        this.planEndDate = planEndDate;
        this.account = account;
    }

    public void setCrew(String crewName, LocalDate planStartDate, LocalDate planEndDate) {
        this.crewName = crewName;
        this.planStartDate = planStartDate;
        this.planEndDate = planEndDate;
    }
}
