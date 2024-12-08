package com.example.triplan.application.board.dto.request;

import lombok.Getter;

import java.util.List;

@Getter
public class SetBoardRequest {
    private String title;
    private String content;
    private Long crewId;
    private List<Long> selectedPlanIds; // 선택된 Plan ID 리스트
}
