package com.example.triplan.application.account.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class PasswordChangeRequest {
    private String currentPassword; // 현재 비밀번호
    private String newPassword;
    private String newPasswordConfirm;
}
