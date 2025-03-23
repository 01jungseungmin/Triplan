package com.example.triplan.application.board.controller;

import com.example.triplan.application.board.dto.request.SetBoardRequest;
import com.example.triplan.application.board.dto.request.UpdateBoardRequest;
import com.example.triplan.application.board.dto.response.BoardDetailResponse;
import com.example.triplan.application.board.dto.response.BoardResponse;
import com.example.triplan.application.board.service.BoardReadService;
import com.example.triplan.application.board.service.BoardWriteService;
import com.example.triplan.application.s3.service.S3ImageService;
import com.example.triplan.exception.S3Exception;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController

@RequiredArgsConstructor
@Tag(name = "커뮤니티 관련 API", description = "BoardController")
public class BoardController {

    private final BoardReadService boardReadService;
    private final BoardWriteService boardWriteService;
    private final S3ImageService s3ImageService;

    // 게시글 전체 조회
    @GetMapping("/place/findAll")
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

    @PostMapping("/write/{crewId}")
    @Operation(summary = "게시글 작성", description = "게시글 작성")
    public ResponseEntity<Map<String, Object>> createBoard(@RequestPart(value = "images", required = false) List<MultipartFile> images, @RequestPart SetBoardRequest setBoardRequest, @PathVariable Long crewId) throws S3Exception {

        Long boardId = boardWriteService.create(setBoardRequest, crewId, images);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "게시글 작성 완료");
        response.put("boardId", boardId);

        return ResponseEntity.ok(response);
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