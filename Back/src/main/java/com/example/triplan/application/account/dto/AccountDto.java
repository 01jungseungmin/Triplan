package com.example.triplan.application.account.dto;

import com.example.triplan.domain.account.enums.Role;
import lombok.Data;
import lombok.Getter;

@Getter
public class AccountDto {
    private String userid;
    private String email;
    private String nickName;
    private String password;
    private Role role;
}
