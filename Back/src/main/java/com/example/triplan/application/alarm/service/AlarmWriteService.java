package com.example.triplan.application.alarm.service;

import com.example.triplan.application.account.service.AccountService;
import com.example.triplan.application.alarm.dto.request.AlarmRequest;
import com.example.triplan.application.alarm.dto.response.AlarmInviteResponse;
import com.example.triplan.domain.account.entity.Account;
import com.example.triplan.domain.alarm.entity.Alarm;
import com.example.triplan.domain.alarm.repository.AlarmRepository;
import com.example.triplan.domain.crew.entity.CrewList;
import com.example.triplan.domain.crew.enums.IsAccept;
import com.example.triplan.domain.crew.repository.CrewListRepository;
import com.example.triplan.exception.ErrorCode;
import com.example.triplan.exception.TriplanException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class AlarmWriteService {

    private final AccountService accountService;
    private final CrewListRepository crewListRepository;
    private final AlarmRepository alarmRepository;

    public AlarmInviteResponse setInviteAccept(AlarmRequest alarmRequest) {
        Account account = accountService.getCurrentUser();

        CrewList crewList = crewListRepository.findByAccountAndCrewId(account, alarmRequest.getCrewId())
                .orElseThrow(() -> new TriplanException(ErrorCode.CREW_NOT_FOUND));
        Alarm alarm = alarmRepository.findByCrewList(crewList)
                .orElseThrow(() -> new TriplanException(ErrorCode.ALARM_NOT_FOUND));

        if (alarmRequest.getInviteType() == IsAccept.ACCEPT) {
            // 초대 수락: 상태 변경
            crewList.setIsAccept(IsAccept.ACCEPT); // CrewList의 상태를 ACCEPT로 변경
            alarmRepository.delete(alarm);        // 알림 삭제
        } else if (alarmRequest.getInviteType() == IsAccept.DECLINE) {
            // 초대 거절: CrewList 삭제
            alarmRepository.delete(alarm);        // 알림 삭제
            crewListRepository.delete(crewList);  // CrewList 삭제
        }

        return new AlarmInviteResponse(account.getId(), crewList.getCrew().getId(), crewList.getIsAccept());
    }
}
