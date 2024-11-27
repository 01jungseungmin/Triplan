package com.example.triplan.domain.board.entity;

import com.example.triplan.common.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class BoardImage extends BaseEntity {

    @Column(name = "boardImageUrl", nullable = false)
    private String boardImageUrl;

    @ManyToOne
    @JoinColumn(name = "board_id")
    private Board board;

    public BoardImage(String boardImageUrl, Board board) {
        this.boardImageUrl = boardImageUrl;
        this.board = board;
    }
}
