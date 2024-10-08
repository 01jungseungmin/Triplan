package com.example.triplan.application.crew.controller;

import com.example.triplan.application.crew.dto.request.CrewRequest;
import com.example.triplan.application.crew.service.CrewWriteService;
import com.example.triplan.domain.crew.entity.Crew;
import com.example.triplan.exception.CustomAuthenticationException;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class CrewController {
    private final CrewWriteService crewWriteService;

    @PostMapping("/create")
    public ResponseEntity<Crew> createCrew(@RequestBody CrewRequest crewRequest) throws CustomAuthenticationException {
        return ResponseEntity.ok(crewWriteService.create(crewRequest));
    }
}
