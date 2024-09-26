package com.example.triplan.domain.alarm.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum AlarmType {
    ACCEPT, DECLINE, WAIT
}