package com.example.triplan.application.placeAdd.controller;

import com.example.triplan.application.placeAdd.dto.request.SetAccountPlaceRequest;
import com.example.triplan.application.placeAdd.service.PlaceAddWriteService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/placeAdd")
@Tag(name = "나만의 장소 추가 API", description = "PlaceAddController")
public class PlaceAddController {
    private final PlaceAddWriteService placeAddWriteService;

//    @PostMapping("/create")
//    public String setAccountPlace(@RequestBody SetAccountPlaceRequest setAccountPlaceRequest){
//        return placeAddWriteService.setAccountPlace(setAccountPlaceRequest);
//    }
}
