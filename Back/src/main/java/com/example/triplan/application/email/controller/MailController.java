package com.example.triplan.application.email.controller;

import com.example.triplan.application.email.dto.request.SendEmail;
import com.example.triplan.application.email.service.MailService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/mail")
@Tag(name = "이메일 발송 API", description = "MailController")
@RequiredArgsConstructor
public class MailController {
    private final MailService mailService;

    @PostMapping("/send/{crewId}")
    @Operation(summary = "이메일 발송", description = "회원 가입 되어 있는 회원을 그룹에 초대하면 이메일이 발송됩니다.")
    public ResponseEntity<String> setInviteCrew(@RequestBody SendEmail email, @PathVariable(value = "crewId") Long crewId){
        mailService.setInviteCrew(email.email(), crewId);
        return new ResponseEntity<>("초대 메일 발송 성공", HttpStatus.OK);
    }
}
