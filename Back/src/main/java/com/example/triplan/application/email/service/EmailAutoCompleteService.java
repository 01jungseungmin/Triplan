package com.example.triplan.application.email.service;

import com.example.triplan.domain.account.entity.Account;
import com.example.triplan.domain.account.repository.AccountRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmailAutoCompleteService {

    private final AccountRepository accountRepository;  // 계정 레포지토리
    private final Trie trie;  // 트라이 자료구조

    public EmailAutoCompleteService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
        this.trie = new Trie();  // 트라이 초기화

        // DB에서 모든 계정을 가져와 이메일을 트라이에 삽입
        List<Account> accounts = accountRepository.findAll();
        for (Account account : accounts) {
            trie.insert(account.getEmail());  // 이메일을 트라이에 삽입
        }
    }

    // 이메일 자동완성 결과를 가져오는 메서드
    public List<String> getEmailSuggestions(String query) {
        return trie.searchPrefix(query);  // 트라이에서 접두사로 이메일 검색
    }

}