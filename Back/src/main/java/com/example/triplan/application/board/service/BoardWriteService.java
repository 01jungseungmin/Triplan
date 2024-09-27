package com.example.triplan.application.board.service;

import com.example.triplan.application.board.dto.request.SetBoardRequest;
import com.example.triplan.application.board.dto.request.UpdateBoardRequest;
import com.example.triplan.domain.board.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class BoardWriteService {
    private final BoardRepository boardRepository;

    //게시글 작성
    public String create(Long accountId, SetBoardRequest setBoardRequest){
        return "게시글 작성 완료";
    }

    //게시글 수정
    public String update(Long accountId, Long boardId, UpdateBoardRequest updateBoardRequest){
        return "게시글 수정 완료";
    }

    //관리자 게시글 삭제
    public String deleteAdminBoard(Long accountId, Long boardId){
        return "관리자 게시글 삭제 완료";
    }

    //사용자 게시글 삭제
    public String deleteAccountBoard(Long accountId, Long boradId){
        return "게시글 삭제 완료";
    }
}
