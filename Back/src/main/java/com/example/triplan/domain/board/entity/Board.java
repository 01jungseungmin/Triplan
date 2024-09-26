package com.example.triplan.domain.board.entity;

import com.example.triplan.common.BaseEntity;
import com.example.triplan.domain.account.entity.Account;
import com.example.triplan.domain.plan.entity.Plan;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;

import java.time.LocalTime;
@Entity
@Getter
public class Board extends BaseEntity {
    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "content", nullable = false)
    private String content;

    @Column(name = "count", nullable = false)
    private Integer count;

    @ManyToOne
    @JoinColumn(name = "plan_id")
    private Plan plan;

    @ManyToOne
    @JoinColumn(name = "account_id")
    private Account account;
}
