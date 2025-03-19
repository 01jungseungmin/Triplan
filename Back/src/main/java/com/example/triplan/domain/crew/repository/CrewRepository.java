package com.example.triplan.domain.crew.repository;

import com.example.triplan.domain.account.entity.Account;
import com.example.triplan.domain.crew.entity.Crew;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CrewRepository extends JpaRepository<Crew, Long>{

    List<Crew> findAllByAccount(Account account);

    @Modifying
    @Query("DELETE FROM BoardPlan bp WHERE bp.board.id IN (SELECT b.id FROM Board b WHERE b.crew.id = :crewId)")
    void deleteBoardPlansByCrew(@Param("crewId") Long crewId);

    @Modifying
    @Query("DELETE FROM Board b WHERE b.crew.id = :crewId")
    void deleteBoardsByCrew(@Param("crewId") Long crewId);

    @Modifying
    @Query("DELETE FROM Plan p WHERE p.crew.id = :crewId")
    void deletePlansByCrew(@Param("crewId") Long crewId);

    @Modifying
    @Query("DELETE FROM CrewList cl WHERE cl.crew.id = :crewId")
    void deleteCrewListsByCrew(@Param("crewId") Long crewId);
}
