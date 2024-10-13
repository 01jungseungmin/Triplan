package com.example.triplan.domain.alarm.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum AlarmType {
    INVITE("님께서 초대하셨습니다.");

    private final String content;
}