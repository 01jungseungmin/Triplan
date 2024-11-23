package com.example.triplan.application.answer.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AnswerResponse {
    private Long answerId;
    private String content;
    private Long accountId;
    private Long boardId;
}
