package com.example.triplan.application.account.service;

import com.example.triplan.application.account.dto.AccountDto;
import com.example.triplan.domain.account.entity.Account;
import com.example.triplan.domain.account.enums.Role;
import com.example.triplan.domain.account.repository.AccountRepository;
import com.example.triplan.security.jwt.TokenDto;
import com.example.triplan.security.jwt.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
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
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private static final Logger logger = LoggerFactory.getLogger(AccountService.class);

    @Transactional
    public Account join(AccountDto accountDto) {
        Optional<Account> existingUser = Optional.ofNullable(accountRepository.findByEmail(accountDto.getEmail()));
        if (existingUser.isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "이미 가입되어 있는 유저입니다.");
        }
        Account account = new Account(accountDto.getEmail(), accountDto.getNickName(), passwordEncoder.encode(accountDto.getPassword()), Role.ROLE_USER);
        return accountRepository.save(account);
    }

    public TokenDto login(AccountDto accountDto) {
        // 유저 인증
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(accountDto.getEmail(), accountDto.getPassword());
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // 토큰 발급
        String jwt = tokenProvider.createToken(authentication);

        // 계정 검색
        Account account = accountRepository.findByEmail(accountDto.getEmail());


        String nickName = account.getNickName();
        Set<Role> userRoles = account.getRoles();

        // Set redirect URI based on user role
        String redirectUri = userRoles.contains(Role.ROLE_USER) ? "/main" : "/login";

        return new TokenDto(jwt, nickName);
    }

    public Account getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication(); // 현재 로그인한 사용자의 인증 정보를 가져옵니다.
        if (authentication == null || authentication instanceof AnonymousAuthenticationToken) {
            return null; // 로그인이 되어 있지 않으면 null 반환
        }
        String email = authentication.getName();
        return accountRepository.findByEmail(email); // 로그인한 사용자의 이메일을 사용하여 사용자 정보를 조회합니다.
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
    public void logout(){
        Authentication authentication =SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            ((UsernamePasswordAuthenticationToken) authentication).setDetails(null); // 토큰의 만료 시간을 현재 시간으로 설정하여 토큰을 무효화
        }else {
            logger.info("토큰이 존재하지 않음. 로그인 되어 있지 않음.");
        }
    }
}
