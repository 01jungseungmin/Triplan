package com.example.triplan.application.account.dto;

import com.example.triplan.domain.account.enums.Role;
import lombok.Data;
import lombok.Getter;

@Getter
public class AccountDto {
    private String email;
    private String nickName;
    private String password;
    private Role role;

    public AccountDto(String email, String nickName) {
        this.email = email;
        this.nickName = nickName;
    }
}
