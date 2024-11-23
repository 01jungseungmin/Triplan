package com.example.triplan.domain.answer.entity;

import com.example.triplan.common.BaseEntity;
import com.example.triplan.domain.account.entity.Account;
import com.example.triplan.domain.board.entity.Board;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Answer extends BaseEntity {

    @Column(name = "content", nullable = false)
    private String content;

    @ManyToOne
    @JoinColumn(name = "board_id")
    private Board board;

    @ManyToOne
    @JoinColumn(name = "account_id")
    private Account account;

    public void update(String content) {
        this.content = content;
    }
}