package com.example.triplan.application.alarm.service;
import com.example.triplan.application.account.service.AccountService;
import com.example.triplan.application.alarm.dto.response.AlarmResponse;
import com.example.triplan.domain.account.entity.Account;
import com.example.triplan.domain.alarm.entity.Alarm;
import com.example.triplan.domain.alarm.enums.AlarmType;
import com.example.triplan.domain.alarm.repository.AlarmRepository;
import com.example.triplan.domain.crew.entity.CrewList;
import com.example.triplan.domain.crew.repository.CrewListRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AlarmReadService {

    private final AlarmRepository alarmRepository;
    private final CrewListRepository crewListRepository;
    private final AccountService accountService;

    public List<AlarmResponse> findAllAlarm() {
        Account account = accountService.getCurrentUser();
        List<CrewList> crewList = crewListRepository.findAllByAccount(account);
        List<Alarm> alarms = alarmRepository.findAllByCrewListIn(crewList);

        return alarms.stream()
                .map(alarm -> new AlarmResponse(alarm.getId(), alarm.getCrewList().getCrew().getId(), AlarmType.INVITE, alarm.getCrewList().getIsAccept(),
                        alarm.getCrewList().getCrew().getCrewName(), alarm.getCrewList().getCrew().getAccount().getNickName(), alarm.getCreatedAt(),
                        alarm.getAlarmType().getContent()))
                .collect(Collectors.toList());
    }
}
