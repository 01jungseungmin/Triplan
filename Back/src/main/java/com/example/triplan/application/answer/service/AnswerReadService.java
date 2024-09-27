package com.example.triplan.application.answer.service;

import com.example.triplan.application.answer.dto.response.AnswerResponse;
import com.example.triplan.domain.answer.repository.AnswerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AnswerReadService {
    private final AnswerRepository answerRepository;

    //댓글 조회
    public AnswerResponse findAnswer(Long accountId, Long boardId) {
        return null;
    }
}
