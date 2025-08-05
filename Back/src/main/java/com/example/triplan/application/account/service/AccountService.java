package com.example.triplan.application.account.service;

import com.example.triplan.application.account.dto.AccountDto;
import com.example.triplan.domain.account.entity.Account;
import com.example.triplan.domain.account.enums.Role;
import com.example.triplan.domain.account.repository.AccountRepository;
import com.example.triplan.security.jwt.TokenDto;
import com.example.triplan.security.jwt.TokenProvider;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;


import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class AccountService {

    private final TokenProvider tokenProvider;
    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private static final Logger logger = LoggerFactory.getLogger(AccountService.class);

    @Transactional
    public Account join(AccountDto accountDto) {
        if (accountRepository.existsByEmail(accountDto.getEmail())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "이미 가입되어 있는 유저입니다.");
        }

        String encodedPassword = passwordEncoder.encode(accountDto.getPassword());

        Account account = new Account(accountDto.getEmail(), accountDto.getNickName(), encodedPassword, Role.ROLE_USER);
        return accountRepository.save(account);
    }

    public TokenDto login(AccountDto accountDto) {
        // 유저 인증
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(accountDto.getEmail(), accountDto.getPassword());
        Authentication authentication = authenticationManager.authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // 토큰 발급
        TokenDto tokenDto = tokenProvider.generateTokenDto(authentication);

        return tokenDto;
    }

    public Account getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication(); // 현재 로그인한 사용자의 인증 정보를 가져옵니다.
        if (authentication == null || authentication.isAuthenticated()) {
            return null; // 로그인이 되어 있지 않으면 null 반환
        }
        String email = authentication.getName();
        return accountRepository.findByEmail(email); // 로그인한 사용자의 이메일을 사용하여 사용자 정보를 조회합니다.
    }

    @Transactional
    public void logout(HttpServletRequest request) {
        String token = resolveToken(request);
        if (token != null) {
            try {
                String email = tokenProvider.getUserEmailFromToken(token);  // 토큰에서 이메일 추출
                tokenProvider.logout(token, email);  // Redis에서 키 삭제
                logger.info("로그아웃 성공: {}", email);
            } catch (Exception e) {
                logger.warn("토큰 해석 실패 또는 잘못된 토큰. 로그아웃 처리 실패.");
            }
        } else {
            logger.info("요청에 토큰이 없음. 로그아웃 처리하지 않음.");
        }
    }

    @Transactional
    public Optional<Account> enterUserInfo(String password) {
        Account account = getCurrentUser(); // 현재 로그인된 사용자 정보 가져오기
        if (passwordEncoder.matches(password, account.getPassword())) { // 비밀번호 비교
            return Optional.of(account); // 비밀번호가 일치하면 사용자 정보 반환
        } else {
            return Optional.empty(); // 비밀번호가 일치하지 않으면 빈 값 반환
        }
    }

    private String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

    public void updateCurrentUser(AccountDto accountDto) {
        Account currentUser = getCurrentUser();
        if (currentUser == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "로그인이 필요합니다.");
        }
        if (accountDto.getNickName() != null && !accountDto.getNickName().isEmpty()) {
            currentUser.setNickName(accountDto.getNickName());
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "유효하지 않은 닉네임입니다.");
        }

        accountRepository.save(currentUser);
    }

    @Transactional
    public void modifyUserPassword(String currentPassword, String newPassword,String newPasswordConfirm) {
        Account currentUser = getCurrentUser(); // 현재 로그인된 사용자 가져오기

        // 입력받은 비밀번호와 현재 비밀번호 비교
        if (!passwordEncoder.matches(currentPassword, currentUser.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "비밀번호가 일치하지 않습니다.");
        }
        // 새 비밀번호와 새 비밀번호 확인이 일치하는지 확인
        if (!newPassword.equals(newPasswordConfirm)) {
            throw new IllegalArgumentException("새 비밀번호와 새 비밀번호 확인이 일치하지 않습니다.");
        }
        // 새 비밀번호로 설정하고 저장
        currentUser.setPassword(passwordEncoder.encode(newPassword));
        accountRepository.save(currentUser); // 비밀번호 업데이트
    }
}