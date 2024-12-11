package com.example.triplan.application.account.dto;

import com.example.triplan.domain.account.enums.Role;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

@Getter
public class AccountDto {
    @Schema(description = "이메일", example = "1@naver.com")
    private String email;

    @Schema(description = "닉네임", example = "1")
    private String nickName;

    @Schema(description = "비밀번호", example = "1")
    private String password;

    @Schema(description = "역할", example = "USER,ADMIN")
    private Role role;

    public AccountDto(String email, String nickName) {
        this.email = email;
        this.nickName = nickName;
    }
}
