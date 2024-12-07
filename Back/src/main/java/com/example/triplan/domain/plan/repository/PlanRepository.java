package com.example.triplan.domain.plan.repository;

import com.example.triplan.domain.account.entity.Account;
import com.example.triplan.domain.crew.entity.Crew;
import com.example.triplan.domain.plan.entity.Plan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface PlanRepository extends JpaRepository<Plan, Long>{
    Optional<Plan> findByCrewAndPlanDateAndPlanStartTime(Crew crew, LocalDate planDate, LocalTime planStartTime);
    @Query("SELECT p FROM Plan p " +
            "WHERE p.crew.id = :crewId " +
            "AND :accountId IN (SELECT cl.account.id FROM CrewList cl WHERE cl.crew.id = :crewId AND cl.isAccept = 'ACCEPT')")
    List<Plan> findAllByCrewIdAndAccountId(@Param("crewId") Long crewId, @Param("accountId") Long accountId);
    void deleteAllByCrew(Crew crew);
}

