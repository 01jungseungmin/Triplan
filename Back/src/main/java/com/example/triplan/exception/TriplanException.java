package com.example.triplan.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class TriplanException extends RuntimeException{
    private final ErrorCode errorCode;
}
