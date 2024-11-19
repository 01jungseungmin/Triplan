package com.example.triplan.application.board.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BoardDetailResponse {
    private Long id;
    private String title;
    private String content;
    private Integer count; // 조회수 등으로 사용할 수 있습니다.
    private Long accountId; // 작성자 ID
    private Long crewId;    // 관련된 여행 계획 ID

    public BoardDetailResponse(Long id, String title, String content, Integer count, Long accountId, Long crewId) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.count = count;
        this.accountId = accountId;
        this.crewId = crewId;
    }
}
