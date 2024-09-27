package com.example.triplan.application.alarm.service;
import com.example.triplan.application.alarm.dto.response.AlarmResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AlarmReadService {
    public AlarmResponse findAllAlarm(Long alarmId) {

        return null;
    }

}
