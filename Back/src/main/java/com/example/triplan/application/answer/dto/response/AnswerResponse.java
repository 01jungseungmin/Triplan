package com.example.triplan.application.answer.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class AnswerResponse {
    private Long answerId;
    private String content;
    private String nickName;
    private Long boardId;
    private LocalDateTime createdAt; // 댓글 작성 시간
    private LocalDateTime updatedAt; // 댓글 수정 시간
}
