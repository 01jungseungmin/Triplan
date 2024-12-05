package com.example.triplan.application.admin.controller;


import com.example.triplan.application.admin.dto.request.AdminPlaceAddRequest;
import com.example.triplan.application.admin.dto.request.AdminPlaceAddUpdateRequest;
import com.example.triplan.application.admin.dto.response.AdminBoardDeleteResponse;
import com.example.triplan.application.admin.service.AdminPlaceAddReadService;
import com.example.triplan.application.admin.service.AdminPlaceAddWriteService;
import com.example.triplan.exception.S3Exception;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin")
@Tag(name = "관리자 API", description = "AdminController")
public class AdminController {

    private final AdminPlaceAddWriteService adminPlaceAddWriteService;
    private final AdminPlaceAddReadService adminPlaceAddReadService;

    @PostMapping("/create")
    public String adminPlaceAdd(@RequestPart AdminPlaceAddRequest adminPlaceAddRequest, @RequestPart(value = "images", required = false) List<MultipartFile> images) throws S3Exception {
        return adminPlaceAddWriteService.adminPlaceAdd(adminPlaceAddRequest, images);
    }

    @PutMapping("/update")
    @Operation(summary = "관리자 장소 수정", description = "관리자 장소 수정")
    public String adminPlaceUpdate(@RequestPart(value = "adminPlaceAddUpdateRequest") AdminPlaceAddUpdateRequest adminPlaceAddUpdateRequest, @RequestPart(value = "images", required = false) List<MultipartFile> images) throws S3Exception {
        return adminPlaceAddWriteService.adminPlaceUpdate(adminPlaceAddUpdateRequest, images);
    }

    @DeleteMapping("/delete/{placeId}")
    public String adminPlaceDelete(@PathVariable Long placeId){
        return adminPlaceAddWriteService.adminPlaceDelete(placeId);
    }

    @GetMapping("/{boardId}")
    public AdminBoardDeleteResponse findAdminBoard(@PathVariable Long boardId) {
        return adminPlaceAddReadService.findAdminBoard(boardId);
    }
}
