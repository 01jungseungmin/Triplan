package com.example.triplan.application.board.service;

import com.example.triplan.application.account.service.AccountService;
import com.example.triplan.application.board.dto.request.SetBoardRequest;
import com.example.triplan.application.board.dto.request.UpdateBoardRequest;
import com.example.triplan.domain.account.entity.Account;
import com.example.triplan.domain.account.repository.AccountRepository;
import com.example.triplan.domain.board.entity.Board;
import com.example.triplan.domain.board.repository.BoardRepository;
import com.example.triplan.domain.crew.entity.Crew;
import com.example.triplan.domain.crew.repository.CrewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class BoardWriteService {
    private final BoardRepository boardRepository;
    private final CrewRepository crewRepository;
    private final AccountService accountService;

    // 게시글 작성
    public String create(SetBoardRequest setBoardRequest, Long crewId) {
        Account account = accountService.getCurrentUser(); // 현재 로그인된 사용자 정보 가져오기

        // crewId로 그룹 찾기
        Crew crew = crewRepository.findById(crewId)
                .orElseThrow(() -> new IllegalArgumentException("그룹을 찾을 수 없습니다."));

        // 게시글 작성
        Board board = new Board(setBoardRequest.getTitle(), setBoardRequest.getContent(), account, crew); // crew 추가
        boardRepository.save(board);

        return "게시글 작성 완료";
    }

    // 게시글 수정
    public String update(Long boardId, UpdateBoardRequest updateBoardRequest) {
        Account account = accountService.getCurrentUser(); // 현재 로그인된 사용자 정보 가져오기

        Board board = boardRepository.findById(boardId)
                .orElseThrow(() -> new RuntimeException("게시글을 찾을 수 없습니다."));

        if (!board.getAccount().getId().equals(account.getId())) {
            throw new RuntimeException("권한이 없습니다.");
        }
        board.update(updateBoardRequest.getTitle(), updateBoardRequest.getContent());
        return "게시글 수정 완료";
    }


    // 사용자 게시글 삭제
    public String deleteAccountBoard(Long boardId) {
        Board board = boardRepository.findById(boardId)
                .orElseThrow(() -> new RuntimeException("게시글을 찾을 수 없습니다."));

        Account account = accountService.getCurrentUser(); // 현재 로그인된 사용자 정보 가져오기

        // 작성자만 삭제할 수 있도록 권한 체크
        if (!board.getAccount().getId().equals(account.getId())) {
            throw new RuntimeException("작성자만 게시글을 삭제할 수 있습니다.");
        }
        boardRepository.delete(board);
        return "게시글 삭제 완료";
    }

}
