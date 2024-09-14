package com.example.triplan.application.account.service;

import com.example.triplan.application.account.dto.AccountDto;
import com.example.triplan.domain.account.entity.Account;
import com.example.triplan.domain.account.entity.Role;
import com.example.triplan.domain.account.repository.AccountRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AccountService {
    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;
    private static final Logger logger = LoggerFactory.getLogger(AccountService.class);
    @Transactional
    public Account signup(AccountDto accountDto) {
        Optional<Account> existingUser = Optional.ofNullable(accountRepository.findByEmail(accountDto.getEmail()));
        if (existingUser.isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "이미 가입되어 있는 유저입니다.");
        }
        Account account = new Account();
        account.setEmail(accountDto.getEmail());
        account.setNickName(accountDto.getNickName());
        account.setPassword(passwordEncoder.encode(accountDto.getPassword()));
        account.setRole(Role.ROLE_USER);
        return accountRepository.save(account);
    }
}
