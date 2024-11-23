package com.example.triplan.application.board.dto.request;

import lombok.Getter;

@Getter
public class SetBoardRequest {
    private String title;
    private String content;
    private Long crewId;
}
