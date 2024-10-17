package com.example.triplan.application.plan.controller;

import com.example.triplan.application.crew.dto.request.CrewRequest;
import com.example.triplan.application.crew.dto.response.CrewResponse;
import com.example.triplan.application.crew.service.CrewWriteService;
import com.example.triplan.application.plan.dto.request.PlanRequest;
import com.example.triplan.application.plan.dto.response.PlanResponse;
import com.example.triplan.application.plan.service.PlanReadService;
import com.example.triplan.application.plan.service.PlanWriteService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
public class PlanController {
    private final PlanWriteService planWriteService;
    private final PlanReadService planReadService;

    @PostMapping("/plan/create")
    public ResponseEntity<?> createCrew(@RequestBody PlanRequest planRequest){
        return ResponseEntity.ok(planWriteService.create(planRequest));
    }
    @GetMapping("/plan/{crewId}")
    public ResponseEntity<List<PlanResponse>> getPlansByCrew(@PathVariable Long crewId) {
        List<PlanResponse> planResponses = planReadService.findAllPlansForCurrentUser(crewId); // 로그인한 유저가 속한 Crew의 모든 Plan 조회
        return ResponseEntity.ok(planResponses);
    }
    @PostMapping("/plan/{crewId}/{planId}/modify")
    public ResponseEntity<PlanResponse> modifyPlan(@PathVariable Long planId,@PathVariable Long crewId, @RequestBody PlanRequest planRequest) {
        List<PlanResponse> planResponses = planReadService.findAllPlansForCurrentUser(crewId);
        PlanResponse updatedPlan = planWriteService.modify(planId, planRequest);
        return ResponseEntity.ok(updatedPlan);
    }

    @PostMapping("/plan/{crewId}/{planId}/delete")
    public ResponseEntity<?> deletePlan(@PathVariable Long planId,@PathVariable Long crewId) {
        List<PlanResponse> planResponses = planReadService.findAllPlansForCurrentUser(crewId);
        planWriteService.delete(planId);
        return ResponseEntity.ok("일정이 삭제되었습니다.");
    }
}
