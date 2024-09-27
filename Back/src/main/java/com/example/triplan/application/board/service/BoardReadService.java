package com.example.triplan.application.board.service;

import com.example.triplan.application.board.dto.response.BoardDetailResponse;
import com.example.triplan.application.board.dto.response.BoardResponse;
import com.example.triplan.domain.board.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BoardReadService {
    private final BoardRepository boardRepository;

    //게시글 전체 조회
    public BoardResponse findAll() {
        return null;
    }

    //게시글 상세 조회
    public BoardDetailResponse getDetails(Long boardId){
        return null;
    }
}
