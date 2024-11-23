package com.example.triplan.application.board.controller;

import com.example.triplan.application.board.dto.request.SetBoardRequest;
import com.example.triplan.application.board.dto.request.UpdateBoardRequest;
import com.example.triplan.application.board.dto.response.BoardDetailResponse;
import com.example.triplan.application.board.dto.response.BoardResponse;
import com.example.triplan.application.board.service.BoardReadService;
import com.example.triplan.application.board.service.BoardWriteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/boards")
@RequiredArgsConstructor
@Tag(name = "커뮤니티 관련 API", description = "BoardController")
public class BoardController {

    private final BoardReadService boardReadService;
    private final BoardWriteService boardWriteService;

    // 게시글 전체 조회
    @GetMapping
    @Operation(summary = "게시글 리스트 출력", description = "게시글 리스트 출력")
    public ResponseEntity<List<BoardResponse>> getAllBoards() {
        List<BoardResponse> boards = boardReadService.findAll();
        return ResponseEntity.ok(boards);
    }

    // 게시글 상세 조회
    @GetMapping("/{boardId}")
    @Operation(summary = "상세 게시글 출력", description = "상세 게시글 출력")
    public ResponseEntity<BoardDetailResponse> getBoardDetails(@PathVariable(value = "boardId") Long boardId, HttpServletRequest request, HttpServletResponse response) {
        BoardDetailResponse boardDetail = boardReadService.getDetails(boardId, request, response);
        return ResponseEntity.ok(boardDetail);
    }

    // 게시글 작성
    @PostMapping("/write/{crewId}")
    @Operation(summary = "게시글 작성", description = "게시글 작성")
    public ResponseEntity<String> createBoard(@RequestBody SetBoardRequest setBoardRequest,@PathVariable Long crewId) {
        return ResponseEntity.ok(boardWriteService.create(setBoardRequest, crewId));
    }

    // 게시글 수정
    @PutMapping("/{boardId}/modify")
    @Operation(summary = "게시글 수정", description = "게시글 수정")
    public ResponseEntity<String> updateBoard(@PathVariable Long boardId, @RequestBody UpdateBoardRequest updateBoardRequest) {
        String message = boardWriteService.update(boardId, updateBoardRequest);
        return ResponseEntity.ok(message);
    }


    // 사용자 게시글 삭제
    @DeleteMapping("/{boardId}")
    @Operation(summary = "게시글 삭제", description = "게시글 삭제")
    public ResponseEntity<String> deleteBoard(@PathVariable Long boardId) {
        String message = boardWriteService.deleteAccountBoard(boardId);
        return ResponseEntity.ok(message);
    }
}