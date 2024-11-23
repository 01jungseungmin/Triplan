package com.example.triplan.application.answer.service;

import com.example.triplan.application.account.service.AccountService;
import com.example.triplan.application.answer.dto.request.AnswerRequest;
import com.example.triplan.application.board.dto.request.UpdateBoardRequest;
import com.example.triplan.domain.account.entity.Account;
import com.example.triplan.domain.answer.entity.Answer;
import com.example.triplan.domain.answer.repository.AnswerRepository;
import com.example.triplan.domain.board.entity.Board;
import com.example.triplan.domain.board.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class AnswerWriteService {
    private final AnswerRepository answerRepository;
    private final BoardRepository boardRepository;
    private final AccountService accountService;

    //댓글 작성
    public String create(Long boardId,AnswerRequest answerRequest){
        Account account = accountService.getCurrentUser();
        Board board = boardRepository.findById(boardId)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글을 찾을 수 없습니다."));

        Answer answer = new Answer(answerRequest.getContent(), board, account);
        answerRepository.save(answer);
        return "댓글 작성 완료";
    }

    //사용자 댓글 삭제
    public String delete(Long boardId,Long answerId){
        Board board = boardRepository.findById(boardId)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글을 찾을 수 없습니다."));

        Answer answer = answerRepository.findById(answerId)
                .orElseThrow(() -> new RuntimeException("댓글을 찾을 수 없습니다."));

        Account account = accountService.getCurrentUser();

        // 작성자만 삭제할 수 있도록 권한 체크
        if (!answer.getAccount().getId().equals(account.getId())) {
            throw new RuntimeException("작성자만 댓글을 삭제할 수 있습니다.");
        }
        answerRepository.delete(answer);
        return "댓글 삭제 완료";
    }

    //사용자 댓글 수정
    public String update(Long answerId, AnswerRequest answerRequest) {
        Account account = accountService.getCurrentUser(); // 현재 로그인된 사용자 정보 가져오기

        Answer answer = answerRepository.findById(answerId)
                .orElseThrow(() -> new RuntimeException("댓글을 찾을 수 없습니다."));

        if (!answer.getAccount().getId().equals(account.getId())) {
            throw new RuntimeException("권한이 없습니다.");
        }
        answer.update(answerRequest.getContent());
        return "게시글 수정 완료";
    }

    //관리자 댓글 삭제
    public String deleteAdminAnswer(Long boardId, Long answerId){
        return "관리자 댓글 삭제 완료";
    }
}
