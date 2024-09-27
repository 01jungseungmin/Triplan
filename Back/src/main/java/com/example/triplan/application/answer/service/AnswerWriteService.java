package com.example.triplan.application.answer.service;

import com.example.triplan.application.answer.dto.request.AnswerRequest;
import com.example.triplan.domain.account.repository.AccountRepository;
import com.example.triplan.domain.answer.repository.AnswerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class AnswerWriteService {
    private final AnswerRepository answerRepository;

    //댓글 작성
    public String create(Long accountId, Long boardId, AnswerRequest answerRequest){
        return "댓글 작성 완료";
    }

    //사용자 댓글 삭제
    public String deleteAccountAnswer(Long accountId, Long boardId, Long answerId){
        return "댓글 삭제 완료";
    }

    //관리자 댓글 삭제
    public String deleteAdminAnswer(Long accountId, Long boardId, Long answerId){
        return "관리자 댓글 삭제 완료";
    }
}
