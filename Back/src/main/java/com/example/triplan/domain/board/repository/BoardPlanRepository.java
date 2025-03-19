package com.example.triplan.domain.board.repository;

import com.example.triplan.domain.board.entity.BoardPlan;
import com.example.triplan.domain.crew.entity.Crew;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardPlanRepository extends JpaRepository<BoardPlan, Long>{
    List<BoardPlan> findByBoardId(Long boardId); // 특정 게시글과 연관된 BoardPlan 조회

    void deleteByBoard_Crew(Crew crew);
}
