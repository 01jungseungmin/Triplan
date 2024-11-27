package com.example.triplan.application.board.service;

import com.example.triplan.application.account.service.AccountService;
import com.example.triplan.application.board.dto.request.SetBoardRequest;
import com.example.triplan.application.board.dto.request.UpdateBoardRequest;
import com.example.triplan.application.s3.service.S3ImageService;
import com.example.triplan.domain.account.entity.Account;
import com.example.triplan.domain.board.entity.Board;
import com.example.triplan.domain.board.entity.BoardImage;
import com.example.triplan.domain.board.repository.BoardRepository;
import com.example.triplan.domain.crew.entity.Crew;
import com.example.triplan.domain.crew.repository.CrewRepository;
import com.example.triplan.exception.S3Exception;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class BoardWriteService {
    private final BoardRepository boardRepository;
    private final CrewRepository crewRepository;
    private final AccountService accountService;
    private final S3ImageService s3ImageService;

    // 게시글 작성
    public String create(SetBoardRequest setBoardRequest, Long crewId, List<MultipartFile> images) throws S3Exception {
        Account account = accountService.getCurrentUser(); // 현재 로그인된 사용자 정보 가져오기

        // crewId로 그룹 찾기
        Crew crew = crewRepository.findById(crewId)
                .orElseThrow(() -> new IllegalArgumentException("그룹을 찾을 수 없습니다."));
        // 게시글 작성
        Board board = new Board(setBoardRequest.getTitle(), setBoardRequest.getContent(), account, crew); // crew 추가
        boardRepository.save(board);

        // 이미지가 있으면 S3에 업로드하고 boardImage에 저장
        if (images != null && !images.isEmpty()) {
            List<String> uploadedImageUrls = s3ImageService.uploadImages(images); // S3에 이미지 업로드
            // 업로드된 이미지 URL로 BoardImage 생성 및 저장
            for (String imageUrl : uploadedImageUrls) {
                BoardImage boardImage = new BoardImage(imageUrl, board);
                board.addBoardImage(boardImage); // 연관 관계 설정
            }
        }


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
