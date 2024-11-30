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
    PLACE_NOT_FOUND(HttpStatus.NOT_FOUND, "장소를 찾을 수 없습니다."),
    EMPTY_FILE_EXCEPTION(HttpStatus.NOT_FOUND,"파일이 올라가지 않습니다"),
    IO_EXCEPTION_ON_IMAGE_UPLOAD(HttpStatus.NOT_FOUND,"파일이 올라가지 않습니다"),
    NO_FILE_EXTENTION(HttpStatus.NOT_FOUND,"파일이 존재하지 않습니다"),
    INVALID_FILE_EXTENTION(HttpStatus.NOT_FOUND,"파일이 존재하지 않습니다"),
    PUT_OBJECT_EXCEPTION(HttpStatus.NOT_FOUND,"파일 전송 오류 발생");

    private final HttpStatus httpStatus;
    private final String message;
}
