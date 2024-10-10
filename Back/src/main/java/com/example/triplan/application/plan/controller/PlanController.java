package com.example.triplan.application.plan.controller;

import com.example.triplan.application.crew.dto.request.CrewRequest;
import com.example.triplan.application.crew.dto.response.CrewResponse;
import com.example.triplan.application.crew.service.CrewWriteService;
import com.example.triplan.application.plan.dto.request.PlanRequest;
import com.example.triplan.application.plan.service.PlanWriteService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class PlanController {
    private final PlanWriteService planWriteService;

    @PostMapping("/plan/create")
    public ResponseEntity<?> createCrew(@RequestBody PlanRequest planRequest){
        return ResponseEntity.ok(planWriteService.create(planRequest));
    }
}
