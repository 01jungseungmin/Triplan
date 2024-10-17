package com.example.triplan.domain.plan.repository;

import com.example.triplan.domain.account.entity.Account;
import com.example.triplan.domain.crew.entity.Crew;
import com.example.triplan.domain.plan.entity.Plan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface PlanRepository extends JpaRepository<Plan, Long>{
    Optional<Plan> findByCrewAndPlanDateAndPlanStartTime(Crew crew, LocalDate planDate, LocalTime planStartTime);
    List<Plan> findAllByCrewIdAndCrewAccountId(Long crewId, Long accountId); // 특정 Crew와 Account에 속한 모든 Plan 조회
}

