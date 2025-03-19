package com.example.triplan.domain.board.repository;

import com.example.triplan.domain.account.entity.Account;
import com.example.triplan.domain.board.entity.Board;
import com.example.triplan.domain.crew.entity.Crew;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long>{
    void deleteByCrew(Crew crew);
}
