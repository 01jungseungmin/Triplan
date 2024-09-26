package com.example.triplan.domain.plan.repository;

import com.example.triplan.domain.account.entity.Account;
import com.example.triplan.domain.plan.entity.Plan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlanRepository extends JpaRepository<Plan, Long>{
}
