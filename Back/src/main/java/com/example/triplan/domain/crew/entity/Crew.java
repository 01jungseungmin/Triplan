package com.example.triplan.domain.crew.entity;

import com.example.triplan.common.BaseEntity;
import com.example.triplan.domain.account.entity.Account;
import com.example.triplan.domain.crew.enums.IsAccept;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
public class Crew extends BaseEntity {

    @Column(name = "crewName", nullable = false)
    private String crewName;

    @Column(name = "planName", nullable = false)
    private String planName;

    @Column(name = "planStartDate", nullable = false)
    private String planStartDate;

    @Column(name = "planEndDate", nullable = false)
    private String planEndDate;

    @Enumerated(EnumType.STRING)
    @Schema(description = "그룹 초대 상태값", example = "ACCEPT, DECLINE, WAIT")
    @Column(name ="isAccept", nullable = false)
    private IsAccept isAccept;

    @ManyToOne
    @JoinColumn(name = "account_id")
    private Account account;
}
