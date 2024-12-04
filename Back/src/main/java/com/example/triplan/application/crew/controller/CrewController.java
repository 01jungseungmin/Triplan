package com.example.triplan.application.crew.controller;

import com.example.triplan.application.crew.dto.request.CrewRequest;
import com.example.triplan.application.crew.dto.request.CrewUpdateRequest;
import com.example.triplan.application.crew.dto.response.CrewResponse;
import com.example.triplan.application.crew.service.CrewReadService;
import com.example.triplan.application.crew.service.CrewWriteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
@Tag(name = "여행 관련 API", description = "CrewController")
public class CrewController {
    private final CrewWriteService crewWriteService;
    private final CrewReadService crewReadService;

    @PostMapping("/crew/create")
    @Operation(summary = "여행 생성", description = "여행 생성")
    public ResponseEntity<CrewResponse> createCrew(@RequestBody CrewRequest crewRequest){
        return ResponseEntity.ok(crewWriteService.create(crewRequest));
    }

    @DeleteMapping("/crew/delete/{crewId}")
    @Operation(summary = "여행 삭제", description = "여행 삭제")
    public ResponseEntity<String> deleteCrew(@PathVariable Long crewId) {
        crewWriteService.delete(crewId);
        return ResponseEntity.ok("삭제되었습니다.");
    }

    // 전체 일정 조회
    @GetMapping("/crew/list")
    @Operation(summary = "여행 리스트 출력", description = "여행 리스트 출력")
    public ResponseEntity<List<CrewResponse>> crewList() {
        List<CrewResponse> crewList = crewReadService.findAllCrew();
        return ResponseEntity.ok(crewList);
    }

    // 특정 일정 조회
    @GetMapping("/crew/list/{crewId}")
    @Operation(summary = "특정 여행 출력", description = "특정 여행의 내용 출력")
    public ResponseEntity<CrewResponse> getCrew(@PathVariable Long crewId) {
        Optional<CrewResponse> crew = crewReadService.findCrew(crewId);
        return crew.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    //전체 일정 수정
    @PutMapping("/crew/update/{crewId}")
    public String update(@PathVariable Long crewId, @RequestBody CrewUpdateRequest crewUpdateRequest){
        return crewWriteService.update(crewId, crewUpdateRequest);
    }
}