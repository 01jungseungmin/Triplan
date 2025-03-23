package com.example.triplan.application.place.controller;

import com.example.triplan.application.place.dto.response.PlaceListDetailResponse;
import com.example.triplan.application.place.dto.response.PlaceListResponse;
import com.example.triplan.application.place.service.PlaceReadService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor

@Tag(name = "장소 API", description = "PlaceController")
public class PlaceController {

    private final PlaceReadService placeReadService;

    @GetMapping("/api/boards")
    public List<PlaceListResponse> findAll(){
        return placeReadService.findAll();
    }

    @GetMapping("/details/{placeId}")
    public PlaceListDetailResponse getPlaceDetails(@PathVariable(value = "placeId") Long placeId){
        return placeReadService.getPlaceDetails(placeId);
    }
}
