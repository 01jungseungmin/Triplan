package com.example.triplan.application.board.dto.response;

import com.example.triplan.application.plan.dto.response.PlanResponse;
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
    private String email;
    private List<PlanResponse> plans; // 연결된 플랜 리스트
}
