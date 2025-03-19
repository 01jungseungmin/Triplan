package com.example.triplan.domain.board.entity;

import com.example.triplan.common.BaseEntity;
import com.example.triplan.domain.plan.entity.Plan;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class BoardPlan extends BaseEntity {
    @ManyToOne
    @JoinColumn(name = "board_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Board board;

    @ManyToOne
    @JoinColumn(name = "plan_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Plan plan;
}
