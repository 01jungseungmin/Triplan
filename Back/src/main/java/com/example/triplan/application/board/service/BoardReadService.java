package com.example.triplan.application.board.service;

import com.example.triplan.application.account.service.AccountService;
import com.example.triplan.application.board.dto.response.BoardDetailResponse;
import com.example.triplan.application.board.dto.response.BoardResponse;
import com.example.triplan.domain.account.entity.Account;
import com.example.triplan.domain.board.entity.Board;
import com.example.triplan.domain.board.entity.BoardView;
import com.example.triplan.domain.board.repository.BoardRepository;
import com.example.triplan.domain.board.repository.BoardViewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BoardReadService {
    private final BoardRepository boardRepository;
    private final AccountService accountService;
    private final BoardViewRepository boardViewRepository;

    // 게시글 전체 조회
    public List<BoardResponse> findAll() {
        return boardRepository.findAll().stream()
                .map(board -> new BoardResponse(board.getId(), board.getTitle(), board.getContent(), board.getCount()))
                .collect(Collectors.toList());
    }

    public BoardDetailResponse getDetails(Long boardId) {
        // 게시글 조회
        Board board = boardRepository.findById(boardId)
                .orElseThrow(() -> new RuntimeException("게시글을 찾을 수 없습니다."));

        // JWT 토큰에서 현재 사용자 정보 가져오기
        Account account = accountService.getCurrentUser();
        if (account == null) {
            throw new RuntimeException("사용자를 찾을 수 없습니다.");
        }

        // 이미 조회한 게시글인지 확인
        if (!boardViewRepository.existsByBoardAndAccount(board, account)) {
            // 조회 기록 저장 - 생성자 방식으로 BoardView 객체 생성
            BoardView boardView = new BoardView(board, account, LocalDateTime.now());
            boardViewRepository.save(boardView);

            // 게시글 조회 수 증가
            board.increaseCount();
            boardRepository.save(board);
        }

        // 게시글 상세 조회 반환
        return new BoardDetailResponse(board.getId(), board.getTitle(), board.getContent(), board.getCount(), board.getAccount().getId(), board.getCrew().getId());
    }
}
