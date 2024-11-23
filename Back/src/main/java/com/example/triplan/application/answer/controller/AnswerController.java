package com.example.triplan.application.answer.controller;

import com.example.triplan.application.answer.dto.request.AnswerRequest;
import com.example.triplan.application.answer.dto.response.AnswerResponse;
import com.example.triplan.application.answer.service.AnswerReadService;
import com.example.triplan.application.answer.service.AnswerWriteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Tag(name = "댓글 관련 API", description = "AnswerController")
public class AnswerController {
    private final AnswerWriteService answerWriteService;
    private final AnswerReadService answerReadService;

    @GetMapping("/{boardId}/answer")
    @Operation(summary = "댓글 출력", description = "댓글 출력")
    public ResponseEntity<List<AnswerResponse>> getAnswer(@PathVariable(value = "boardId") Long boardId){
        return ResponseEntity.ok(answerReadService.findAnswer(boardId));
    }


    @PostMapping("/{boardId}/write")
    @Operation(summary = "댓글 작성", description = "댓글 작성")
    public ResponseEntity<String> writeAnswer(@PathVariable(value = "boardId") Long boardId, @RequestBody AnswerRequest answerRequest) {
        return ResponseEntity.ok(answerWriteService.create(boardId, answerRequest));
    }

    @PutMapping("/{answerId}/modify")
    @Operation(summary = "댓글 수정", description = "댓글 수정")
    public ResponseEntity<String> updateAnswer(@PathVariable(value = "answerId") Long answerId, @RequestBody AnswerRequest answerRequest) {
        String message = answerWriteService.update(answerId,answerRequest);
        return ResponseEntity.ok(message);
    }

    @DeleteMapping("/{boardId}/{answerId}/delete")
    @Operation(summary = "댓글 삭제", description = "댓글 삭제")
    public ResponseEntity<String> deleteAnswer(@PathVariable(value = "boardId") Long boardId, @PathVariable(value = "answerId") Long answerId) {
        return ResponseEntity.ok(answerWriteService.delete(boardId, answerId));
    }
}