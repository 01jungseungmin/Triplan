package com.example.triplan.application.account.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class PasswordChangeRequest {
    @Schema(description = "현재 비밀번호", example = "1")
    private String currentPassword; // 현재 비밀번호

    @Schema(description = "새로운 비밀번호", example = "1")
    private String newPassword;

    @Schema(description = "새로운 비밀번호 확인", example = "1")
    private String newPasswordConfirm;
}