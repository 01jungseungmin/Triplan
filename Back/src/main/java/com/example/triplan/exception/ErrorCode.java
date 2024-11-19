package com.example.triplan.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {
    UNABLE_TO_SEND_EMAIL(HttpStatus.BAD_REQUEST, "메일을 보낼 수 없습니다."),
    ACCOUNT_NOT_FOUND(HttpStatus.NOT_FOUND, "회원을 찾을 수 없습니다."),
    CREW_NOT_FOUND(HttpStatus.NOT_FOUND, "그룹을 찾을 수 없습니다."),
    INVITATION_ALREADY_SENT(HttpStatus.BAD_REQUEST, "이미 초대 된 회원입니다."),
    ALARM_NOT_FOUND(HttpStatus.NOT_FOUND, "알림을 찾을 수 없습니다."),
    PLAN_NOT_FOUNT(HttpStatus.NOT_FOUND, "일정을 찾을 수 없습니다."),
    PLACE_NOT_FOUND(HttpStatus.NOT_FOUND, "장소를 찾을 수 없습니다.");

    private final HttpStatus httpStatus;
    private final String message;
}
