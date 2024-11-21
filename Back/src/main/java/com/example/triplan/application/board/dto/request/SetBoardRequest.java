package com.example.triplan.application.board.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
public class SetBoardRequest {
    private String title;
    private String content;
    private Long crewId;
}
