package com.example.triplan.application.board.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDate;
import java.util.List;

@Getter
@AllArgsConstructor
public class BoardDetailResponse {
    private Long boardId;
    private String title;
    private String content;
    private List<String> imageUrls;
    private LocalDate planStartDate;
    private LocalDate planEndDate;
    private String nickName;
}
