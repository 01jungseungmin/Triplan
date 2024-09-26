package com.example.triplan.application.account.controller;

import com.example.triplan.application.account.dto.AccountDto;
import com.example.triplan.application.account.service.AccountService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AccountController {
    private final AccountService accountService;
    @PostMapping("/join")
    public ResponseEntity<String> signup(@Valid @RequestBody AccountDto accountDto) {
        accountService.join(accountDto);
        return ResponseEntity.ok().body("회원가입 완료");
    }
}
