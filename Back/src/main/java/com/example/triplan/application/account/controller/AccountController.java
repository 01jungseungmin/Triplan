package com.example.triplan.application.account.controller;

import com.example.triplan.application.account.dto.AccountDto;
import com.example.triplan.application.account.dto.request.PasswordChangeRequest;
import com.example.triplan.application.account.service.AccountService;
import com.example.triplan.domain.account.entity.Account;
import com.example.triplan.security.jwt.JwtFilter;
import com.example.triplan.security.jwt.TokenDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@Tag(name = "회원 관련 API", description = "AccountController")
public class AccountController {
    private final AccountService accountService;
    private static final Logger logger = LoggerFactory.getLogger(AccountController.class);

    @PostMapping("/join")
    @Operation(summary = "회원가입", description = "회원 가입")
    public ResponseEntity<String> signup(@Valid @RequestBody AccountDto accountDto) {
        accountService.join(accountDto);
        return ResponseEntity.ok().body("회원가입 완료");
    }

    @PostMapping("/login")
    @Operation(summary = "로그인", description = "로그인")
    public ResponseEntity<?> login(@Valid @RequestBody AccountDto accountDto) {
        try {
            TokenDto tokenDto = accountService.login(accountDto);

            // response header에 토큰 추가
            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + tokenDto.getToken());

            return new ResponseEntity<>(tokenDto, httpHeaders, HttpStatus.OK);
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("{\"error\": \"사용자를 찾을 수 없습니다.\"}");
        } catch (Exception e) {
            logger.error("Authentication failed: ", e);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("{\"error\": \"인증에 실패했습니다.\"}");
        }
    }

    @PostMapping("/api/logout")
    @Operation(summary = "로그아웃", description = "로그아웃")
    public ResponseEntity<String> logout(HttpServletRequest servletRequest){
        accountService.logout();
        return ResponseEntity.ok().body("로그아웃");
    }

    @PostMapping("/mypage/password-check")
    @Operation(summary = "마이페이지 접속", description = "마이페이지 접속을 위한 비밀번호 인증")
    public ResponseEntity<String> checkPassword(@RequestBody Map<String, String> request) {
        String password = request.get("password");

        // 비밀번호 확인 후 처리
        return accountService.enterUserInfo(password)
                .map(account -> ResponseEntity.ok("비밀번호 일치")) // 비밀번호가 맞을 경우 확인 메시지 반환
                .orElseGet(() -> ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("비밀번호가 틀렸습니다.")); // 비밀번호가 틀릴 경우 오류 메시지 반환
    }

    @GetMapping("/mypage/user-info")
    @Operation(summary = "마이페이지 출력", description = "마이페이지 출력")
    public ResponseEntity<AccountDto> getUserInfo() {
        Account account = accountService.getCurrentUser(); // 현재 로그인된 사용자 정보 가져오기
        AccountDto accountDto = new AccountDto(account.getEmail(), account.getNickName());
        return ResponseEntity.ok(accountDto); // 사용자 정보 반환
    }

    @PostMapping("/mypage/modify")
    @Operation(summary = "회원정보 수정", description = "회원정보 수정")
    public ResponseEntity<AccountDto> modifyInfo(@RequestBody AccountDto accountDto) {
        accountService.updateCurrentUser(accountDto);
        return ResponseEntity.ok(accountDto);
    }

    @PostMapping("/mypage/modify/password")
    @Operation(summary = "비밀번호 수정", description = "비밀번호 수정")
    public ResponseEntity<?> modifyPassword(@RequestBody PasswordChangeRequest passwordChangeRequest) {
        try {
            accountService.modifyUserPassword(passwordChangeRequest.getCurrentPassword(), passwordChangeRequest.getNewPassword(), passwordChangeRequest.getNewPasswordConfirm());
            return ResponseEntity.ok("비밀번호가 성공적으로 변경되었습니다.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
