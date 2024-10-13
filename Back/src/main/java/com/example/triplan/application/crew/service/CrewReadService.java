package com.example.triplan.application.crew.service;

import com.example.triplan.application.account.service.AccountService;
import com.example.triplan.application.crew.dto.response.CrewResponse;
import com.example.triplan.domain.account.entity.Account;
import com.example.triplan.domain.crew.entity.Crew;
import com.example.triplan.domain.crew.entity.CrewList;
import com.example.triplan.domain.crew.enums.IsAccept;
import com.example.triplan.domain.crew.repository.CrewListRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CrewReadService {

    private final CrewListRepository crewListRepository;
    private final AccountService accountService;

    // 로그인된 사용자가 isAccept가 ACCEPT인 그룹과 해당 그룹의 멤버들을 조회
    public List<CrewResponse> findAllCrew() {
        Account account = accountService.getCurrentUser(); // 현재 로그인된 사용자 정보 가져오기
        List<CrewList> crewLists = crewListRepository.findByAccountAndIsAccept(account, IsAccept.ACCEPT); // ACCEPT 상태인 그룹만 필터링

        // 각 CrewList에서 해당 Crew의 모든 멤버를 조회
        return crewLists.stream()
                .map(crewList -> {
                    Crew crew = crewList.getCrew();
                    List<CrewList> members = crewListRepository.findByCrewAndIsAccept(crew, IsAccept.ACCEPT); // 현재 그룹의 ACCEPT 멤버 리스트 조회
                    return new CrewResponse(crew, members); // CrewResponse 생성 시 모든 멤버 정보 포함
                })
                .collect(Collectors.toList());
    }

    // 특정 그룹 조회
    public Optional<CrewResponse> findCrew(Long crewId) {
        Account account = accountService.getCurrentUser(); // 현재 로그인된 사용자 정보 가져오기
        Optional<CrewList> crewList = crewListRepository.findByCrewIdAndAccountAndIsAccept(crewId, account, IsAccept.ACCEPT); // 특정 그룹 ID와 사용자 및 ACCEPT 상태 필터링

        return crewList.map(crewListItem -> {
            Crew crew = crewListItem.getCrew();
            List<CrewList> members = crewListRepository.findByCrewAndIsAccept(crew, IsAccept.ACCEPT); // 현재 그룹의 ACCEPT 멤버 리스트 조회
            return new CrewResponse(crew, members); // CrewResponse 생성 시 모든 멤버 정보 포함
        });
    }

}
