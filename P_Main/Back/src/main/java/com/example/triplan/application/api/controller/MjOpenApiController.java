package com.example.triplan.application.api.controller;

import com.example.triplan.application.api.dto.RestResponse;
import com.example.triplan.application.api.service.OpenApiManager;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class MjOpenApiController {
    private final OpenApiManager openApiManager;

    @GetMapping("/api/load")
    @Operation(summary = "공공 데이터 조회 및 저장", description = "공공 데이터를 조회하고 저장합니다.")
    public ResponseEntity<Object> loadJsonFromApi(@RequestParam String apiUrl) {
        try {
            openApiManager.loadAndSaveApiData(apiUrl);
            return RestResponse.success(null);
        } catch (Exception e) {
            e.printStackTrace();
            return RestResponse.error("Error occurred: " + e.getMessage());
        }
    }
}
