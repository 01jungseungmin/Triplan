package com.example.triplan.application.board.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BoardResponse {
    private Long id;
    private String title;
    private String content;
    private Integer count; // 조회수 등으로 사용할 수 있습니다.

    public BoardResponse(Long id, String title, String content, Integer count) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.count = count;
    }
}
