package com.example.triplan.application.admin.service;

import com.example.triplan.application.account.service.AccountService;
import com.example.triplan.application.admin.dto.response.AdminBoardDeleteResponse;
import com.example.triplan.domain.account.entity.Account;
import com.example.triplan.domain.account.enums.Role;
import com.example.triplan.domain.board.entity.Board;
import com.example.triplan.domain.board.repository.BoardRepository;
import com.example.triplan.exception.ErrorCode;
import com.example.triplan.exception.TriplanException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AdminPlaceAddReadService {

    private final AccountService accountService;
    private final BoardRepository boardRepository;


    //관리자 게시물 삭제 조회 모달
    public AdminBoardDeleteResponse findAdminBoard(Long boardId) {
        Account account = accountService.getCurrentUser();

        if (account.getRole() != Role.ROLE_ADMIN){
            throw new TriplanException(ErrorCode.ACCESS_DENIED);
        }

        Board board = boardRepository.findById(boardId).orElseThrow(() -> new TriplanException(ErrorCode.BOARD_NOT_FOUND));

        LocalDate nowDate = LocalDate.now();
        LocalTime nowTime = LocalTime.now();

        return new AdminBoardDeleteResponse(nowDate, nowTime);
    }
}
