package com.example.triplan.application.crew.controller;

import com.example.triplan.application.crew.dto.request.CrewRequest;
import com.example.triplan.application.crew.dto.response.CrewResponse;
import com.example.triplan.application.crew.service.CrewReadService;
import com.example.triplan.application.crew.service.CrewWriteService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
public class CrewController {
    private final CrewWriteService crewWriteService;
    private final CrewReadService crewReadService;

    @PostMapping("/crew/create")
    public ResponseEntity<CrewResponse> createCrew(@RequestBody CrewRequest crewRequest){
        return ResponseEntity.ok(crewWriteService.create(crewRequest));
    }

    @PostMapping("/crew/delete/{crewId}")
    public ResponseEntity<String> deleteCrew(@PathVariable Long crewId) {
        crewWriteService.delete(crewId);
        return ResponseEntity.ok("삭제되었습니다.");
    }

    // 전체 일정 조회
    @GetMapping("/crew/list")
    public ResponseEntity<List<CrewResponse>> crewList() {
        List<CrewResponse> crewList = crewReadService.findAllCrew();
        return ResponseEntity.ok(crewList);
    }

    // 특정 일정 조회
    @GetMapping("/crew/list/{crewId}")
    public ResponseEntity<CrewResponse> getCrew(@PathVariable Long crewId) {
        Optional<CrewResponse> crew = crewReadService.findCrew(crewId);
        return crew.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

}
