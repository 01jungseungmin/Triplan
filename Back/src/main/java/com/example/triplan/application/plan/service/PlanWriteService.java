package com.example.triplan.application.plan.service;

import com.example.triplan.application.crew.dto.request.CrewRequest;
import com.example.triplan.application.crew.dto.response.CrewResponse;
import com.example.triplan.application.plan.dto.response.PlanResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class PlanWriteService {
    public PlanResponse create(Long accountId) {

        return null;
    }
    public PlanResponse modify(Long accountId, Long crewId) {

        return null;
    }
    public PlanResponse delete(Long accountId, Long crewId) {

        return null;
    }
}
