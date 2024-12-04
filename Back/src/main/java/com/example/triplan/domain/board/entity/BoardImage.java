package com.example.triplan.domain.board.entity;

import com.example.triplan.common.BaseEntity;
import com.example.triplan.domain.board.enums.BoardEnum;
import com.example.triplan.domain.crew.enums.IsAccept;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
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

    @Enumerated(EnumType.STRING)
    @Schema(description = "이미지 종류", example = "CAPTIAN,NORMAL")
    @Column(name ="boardEnum", nullable = false)
    private BoardEnum boardEnum;

    public BoardImage(String boardImageUrl, BoardEnum boardEnum, Board board) {
        this.boardImageUrl = boardImageUrl;
        this.boardEnum = boardEnum;
        this.board = board;
    }
}
