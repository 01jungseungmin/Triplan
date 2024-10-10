package com.example.triplan.domain.plan.repository;

import com.example.triplan.domain.account.entity.Account;
import com.example.triplan.domain.crew.entity.Crew;
import com.example.triplan.domain.plan.entity.Plan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Optional;

@Repository
public interface PlanRepository extends JpaRepository<Plan, Long>{
    Optional<Plan> findByCrewAndPlanDateAndPlanStartTime(Crew crew, LocalDate planDate, LocalTime planStartTime);

}
