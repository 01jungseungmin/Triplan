package com.example.triplan.application.plan.controller;

import com.example.triplan.application.plan.dto.request.PlanRequest;
import com.example.triplan.application.plan.dto.response.PlanResponse;
import com.example.triplan.application.plan.service.PlanReadService;
import com.example.triplan.application.plan.service.PlanWriteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@Tag(name = "일정 관련 API", description = "PlanController")
public class PlanController {
    private final PlanWriteService planWriteService;
    private final PlanReadService planReadService;

    @PostMapping("/plan/create")
    @Operation(summary = "일정 생성", description = "일정 생성")
    public ResponseEntity<?> createCrew(@RequestBody PlanRequest planRequest){
        return ResponseEntity.ok(planWriteService.create(planRequest));
    }
    @GetMapping("/plan/{crewId}")
    @Operation(summary = "일정 출력", description = "일정 출력")
    public ResponseEntity<List<PlanResponse>> getPlansByCrew(@PathVariable Long crewId) {
        List<PlanResponse> planResponses = planReadService.findAllPlansForCurrentUser(crewId); // 로그인한 유저가 속한 Crew의 모든 Plan 조회
        return ResponseEntity.ok(planResponses);
    }
    @PutMapping("/plan/{crewId}/{planId}/modify")
    @Operation(summary = "일정 수정", description = "일정 수정")
    public ResponseEntity<PlanResponse> modifyPlan(@PathVariable Long planId,@PathVariable Long crewId, @RequestBody PlanRequest planRequest) {
        List<PlanResponse> planResponses = planReadService.findAllPlansForCurrentUser(crewId);
        PlanResponse updatedPlan = planWriteService.modify(planId, planRequest);
        return ResponseEntity.ok(updatedPlan);
    }

    @DeleteMapping("/plan/{crewId}/{planId}/delete")
    @Operation(summary = "일정 삭제", description = "일정 삭제")
    public ResponseEntity<?> deletePlan(@PathVariable Long planId,@PathVariable Long crewId) {
        List<PlanResponse> planResponses = planReadService.findAllPlansForCurrentUser(crewId);
        planWriteService.delete(planId);
        return ResponseEntity.ok("일정이 삭제되었습니다.");
    }
}
