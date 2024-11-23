package com.example.triplan.application.board.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class BoardResponse {
    private Long boardId;
    private String title;
    private String content;
    private Integer count; // 조회수 등으로 사용할 수 있습니다.
    private String nickName;
}
