package com.example.triplan.domain.crew.entity;

import com.example.triplan.common.BaseEntity;
import com.example.triplan.domain.account.entity.Account;
import com.example.triplan.domain.crew.enums.IsAccept;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class CrewList extends BaseEntity {
    @ManyToOne
    @JoinColumn(name = "crew_id")
    private Crew crew;

    @ManyToOne
    @JoinColumn(name = "account_id")
    private Account account;

    @Enumerated(EnumType.STRING)
    @Schema(description = "그룹 초대 상태값", example = "ACCEPT, DECLINE, WAIT")
    @Column(name ="isAccept", nullable = false)
    private IsAccept isAccept;
}