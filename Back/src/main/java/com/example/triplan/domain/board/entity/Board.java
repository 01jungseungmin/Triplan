package com.example.triplan.domain.board.entity;

import com.example.triplan.common.BaseEntity;
import com.example.triplan.domain.account.entity.Account;
import com.example.triplan.domain.crew.entity.Crew;
import com.example.triplan.domain.plan.entity.Plan;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
public class Board extends BaseEntity {
    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "content", nullable = false)
    private String content;

    @Column(name = "count", nullable = false)
    private Integer count;

    @ManyToOne
    @JoinColumn(name = "crew_id")
    private Crew crew;

    @ManyToOne
    @JoinColumn(name = "account_id")
    private Account account;

    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BoardImage> boardImages = new ArrayList<>();

    public Board(String title, String content, Account account, Crew crew) {
        this.title = title;
        this.content = content;
        this.account = account;
        this.crew = crew;
        this.count = 0;
    }

    public void update(String title, String content) {
        this.title = title;
        this.content = content;
    }

    public void increaseCount() {
        this.count++;
    }

    public void addBoardImage(BoardImage boardImage) {
        this.boardImages.add(boardImage);
    }
}