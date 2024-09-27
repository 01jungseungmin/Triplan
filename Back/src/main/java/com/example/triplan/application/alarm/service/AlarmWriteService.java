package com.example.triplan.application.alarm.service;

import com.example.triplan.application.alarm.dto.request.AlarmRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AlarmWriteService {
    public AlarmRequest setInviteAccept(Long accountId,Long alarmId) {
        return null;
    }
}
