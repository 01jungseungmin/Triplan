package com.example.triplan.application.alarm.controller;

import com.example.triplan.application.alarm.dto.request.AlarmRequest;
import com.example.triplan.application.alarm.dto.response.AlarmInviteResponse;
import com.example.triplan.application.alarm.dto.response.AlarmResponse;
import com.example.triplan.application.alarm.service.AlarmReadService;
import com.example.triplan.application.alarm.service.AlarmWriteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/alarm")
@Tag(name = "알림 API", description = "AlarmController")
public class AlarmController {

    private final AlarmReadService alarmReadService;
    private final AlarmWriteService alarmWriteService;

    @GetMapping
    @Operation(summary = "알림 전체 조회", description = "로그인 한 회원의 알림을 전체 조회합니다.")
    public List<AlarmResponse> findAllAlarm(){
        return alarmReadService.findAllAlarm();
    }

    @PostMapping
    @Operation(summary = "그룹 초대 알림 수락/거절", description = "그룹 초대가 온 회원이 수락/거절을 선택합니다.")
    public AlarmInviteResponse setInviteAccept(@RequestBody AlarmRequest alarmRequest){
        return alarmWriteService.setInviteAccept(alarmRequest);
    }
}