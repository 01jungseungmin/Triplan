package com.example.triplan.domain.answer.repository;

import com.example.triplan.domain.account.entity.Account;
import com.example.triplan.domain.answer.entity.Answer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnswerRepository extends JpaRepository<Answer, Long>{
    List<Answer> findByBoardId(Long boardId);
}
