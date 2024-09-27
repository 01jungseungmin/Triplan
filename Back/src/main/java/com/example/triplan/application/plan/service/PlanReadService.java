package com.example.triplan.application.plan.service;

import com.example.triplan.application.crew.dto.response.CrewResponse;
import com.example.triplan.application.plan.dto.response.PlanResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PlanReadService {
    public PlanResponse findAllPlan(Long accountId,Long planId) {

        return null;
    }
}
