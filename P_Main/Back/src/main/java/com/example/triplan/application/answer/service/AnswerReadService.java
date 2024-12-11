package com.example.triplan.application.answer.service;

import com.example.triplan.application.answer.dto.response.AnswerResponse;
import com.example.triplan.domain.answer.entity.Answer;
import com.example.triplan.domain.answer.repository.AnswerRepository;
import com.example.triplan.domain.board.entity.Board;
import com.example.triplan.domain.board.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AnswerReadService {
    private final AnswerRepository answerRepository;
    private final BoardRepository boardRepository;

    //댓글 조회
    public List<AnswerResponse> findAnswer(Long boardId) {

        Board board = boardRepository.findById(boardId)
                .orElseThrow(() -> new RuntimeException("게시글을 찾을 수 없습니다."));
        List<Answer> answers = answerRepository.findByBoardId(boardId);

        return answers.stream()
                .map(answer -> new AnswerResponse(
                        answer.getId(),
                        answer.getContent(),
                        answer.getAccount().getNickName(),
                        answer.getBoard().getId(),
                        answer.getCreatedAt(),
                        answer.getUpdatedAt()
                ))
                .collect(Collectors.toList());
    }
}
