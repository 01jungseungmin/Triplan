package com.example.triplan.application.board.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@AllArgsConstructor
public class BoardDetailResponse {
    private Long boardId;
    private String title;
    private String content;
    private Integer count; // 조회수 등으로 사용할 수 있습니다.
    private Long accountId; // 작성자 ID
    private Long crewId;    // 관련된 여행 계획 ID
}
