package com.example.triplan.application.board.service;

import com.example.triplan.application.account.service.AccountService;
import com.example.triplan.application.board.dto.response.BoardDetailResponse;
import com.example.triplan.application.board.dto.response.BoardResponse;
import com.example.triplan.domain.board.entity.Board;
import com.example.triplan.domain.board.repository.BoardRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BoardReadService {
    private final BoardRepository boardRepository;
    private final AccountService accountService;

    // 게시글 전체 조회
    public List<BoardResponse> findAll() {
        return boardRepository.findAll().stream()
                .map(board -> new BoardResponse(board.getId(), board.getTitle(), board.getContent(), board.getCount(),board.getAccount().getNickName()))
                .collect(Collectors.toList());
    }

    // 게시글 상세 조회
    public BoardDetailResponse getDetails(Long boardId, HttpServletRequest request, HttpServletResponse response) {
        // 게시글 조회
        Board board = boardRepository.findById(boardId)
                .orElseThrow(() -> new RuntimeException("게시글을 찾을 수 없습니다."));

        // 로그인하지 않은 사용자의 조회수 증가 방지 (쿠키 확인)
        String cookieName = "boardViewed-" + boardId;
        Cookie[] cookies = request.getCookies();
        boolean hasViewed = false;

        // 쿠키가 있는지 확인
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals(cookieName)) {
                    hasViewed = true;
                    break;
                }
            }
        }

        // 조회하지 않은 경우 조회수 증가 및 쿠키 설정
        if (!hasViewed) {
            board.increaseCount();
            boardRepository.save(board);

            // 쿠키 설정: 사용자가 이미 조회한 게시글에 대해서만 쿠키 설정
            Cookie viewedCookie = new Cookie(cookieName, "true");
            viewedCookie.setMaxAge(60 * 60 * 24);  // 쿠키의 만료 시간 1일
            viewedCookie.setPath("/"); // 전체 경로에서 유효
            response.addCookie(viewedCookie);
        }

        // 게시글 상세 조회 반환
        return new BoardDetailResponse(board.getId(), board.getTitle(), board.getContent(), board.getCount(),
                board.getAccount().getId(), board.getCrew().getId());
    }
}
