package com.example.triplan.application.board.service;

import com.example.triplan.application.account.service.AccountService;
import com.example.triplan.application.board.dto.request.SetBoardRequest;
import com.example.triplan.application.board.dto.request.UpdateBoardRequest;
import com.example.triplan.application.s3.service.S3ImageService;
import com.example.triplan.domain.account.entity.Account;
import com.example.triplan.domain.account.enums.Role;
import com.example.triplan.domain.board.entity.Board;
import com.example.triplan.domain.board.entity.BoardImage;
import com.example.triplan.domain.board.entity.BoardPlan;
import com.example.triplan.domain.board.enums.BoardEnum;
import com.example.triplan.domain.board.repository.BoardPlanRepository;
import com.example.triplan.domain.board.repository.BoardRepository;
import com.example.triplan.domain.crew.entity.Crew;
import com.example.triplan.domain.crew.repository.CrewRepository;
import com.example.triplan.domain.plan.entity.Plan;
import com.example.triplan.domain.plan.repository.PlanRepository;
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
    private final PlanRepository planRepository;
    private final BoardPlanRepository boardPlanRepository;

    // 게시글 작성
    public Long create(SetBoardRequest setBoardRequest, Long crewId, List<MultipartFile> images) throws S3Exception {
        Account account = accountService.getCurrentUser();

        Crew crew = crewRepository.findById(crewId)
                .orElseThrow(() -> new IllegalArgumentException("그룹을 찾을 수 없습니다."));

        Board board = new Board(setBoardRequest.getTitle(), setBoardRequest.getContent(), account, crew);
        boardRepository.save(board);

        if (images != null && !images.isEmpty()) {
            // 대표 이미지는 첫 번째, 나머지는 추가 이미지로 구분
            List<String> uploadedImageUrls = s3ImageService.uploadImages(images);
            for (int i = 0; i < uploadedImageUrls.size(); i++) {
                String imageUrl = uploadedImageUrls.get(i);
                BoardEnum boardEnum = (i == 0) ? BoardEnum.CAPTIAN : BoardEnum.NORMAL;
                BoardImage boardImage = new BoardImage(imageUrl, boardEnum, board);
                board.addBoardImage(boardImage);
            }
        }

        if (setBoardRequest.getSelectedPlanIds() != null && !setBoardRequest.getSelectedPlanIds().isEmpty()) {
            List<Plan> selectedPlans = planRepository.findAllById(setBoardRequest.getSelectedPlanIds());
            for (Plan plan : selectedPlans) {
                BoardPlan boardPlan = new BoardPlan(board,plan);
                boardPlanRepository.save(boardPlan); // BoardPlan 저장
            }
            planRepository.saveAll(selectedPlans);
        }

        return board.getId();
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
        if (!board.getAccount().getId().equals(account.getId()) && account.getRole() != Role.ROLE_ADMIN) {
            throw new RuntimeException("작성자만 게시글을 삭제할 수 있습니다.");
        }
        boardRepository.delete(board);
        return "게시글 삭제 완료";
    }

}
