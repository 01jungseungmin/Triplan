package com.example.triplan.application.account.service;

import com.example.triplan.application.account.controller.AccountController;
import com.example.triplan.application.account.dto.AccountDto;
import com.example.triplan.domain.account.entity.Account;
import com.example.triplan.domain.account.enums.Role;
import com.example.triplan.domain.account.repository.AccountRepository;
import com.example.triplan.security.jwt.TokenDto;
import com.example.triplan.security.jwt.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
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


        String username = account.getNickName();
        Set<Role> userRoles = account.getRoles();

        // Set redirect URI based on user role
        String redirectUri = userRoles.contains(Role.ROLE_USER) ? "/main" : "/login";

        return new TokenDto(jwt, username);
    }
}
