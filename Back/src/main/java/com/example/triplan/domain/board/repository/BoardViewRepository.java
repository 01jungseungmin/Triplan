package com.example.triplan.domain.board.repository;

import com.example.triplan.domain.account.entity.Account;
import com.example.triplan.domain.board.entity.Board;
import com.example.triplan.domain.board.entity.BoardView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardViewRepository extends JpaRepository<BoardView, Long>{
    boolean existsByBoardAndAccount(Board board, Account account);
}
