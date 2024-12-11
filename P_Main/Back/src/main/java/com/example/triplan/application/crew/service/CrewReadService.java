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

import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CrewReadService {

    private final CrewListRepository crewListRepository;
    private final AccountService accountService;

    // 전체 일정 조회(로그인된 사용자가 isAccept가 ACCEPT인 그룹과 해당 그룹의 멤버들을 조회)
    public List<CrewResponse> findAllCrew() {
        Account account = accountService.getCurrentUser(); // 현재 로그인된 사용자 정보 가져오기
        List<CrewList> crewLists = crewListRepository.findByAccountAndIsAccept(account, IsAccept.ACCEPT); // ACCEPT 상태인 그룹만 필터링
        LocalDate today = LocalDate.now(); // 오늘 날짜 가져오기

        // 각 CrewList에서 해당 Crew의 모든 멤버를 조회 후 필터링 및 정렬
        List<CrewResponse> allCrewResponses = crewLists.stream()
                .map(crewList -> {
                    Crew crew = crewList.getCrew();
                    List<CrewList> members = crewListRepository.findByCrewAndIsAccept(crew, IsAccept.ACCEPT); // 현재 그룹의 ACCEPT 멤버 리스트 조회
                    return new CrewResponse(crew, members); // CrewResponse 생성 시 모든 멤버 정보 포함
                })
                .collect(Collectors.toList());

        // 오늘 일정 필터링
        List<CrewResponse> todayCrewResponses = allCrewResponses.stream()
                .filter(crewResponse -> crewResponse.getPlanStartDate().isEqual(today)) // 오늘 일정
                .collect(Collectors.toList());

        // 미래 일정 필터링 (오늘 이후의 일정)
        List<CrewResponse> futureCrewResponses = allCrewResponses.stream()
                .filter(crewResponse -> crewResponse.getPlanStartDate().isAfter(today)) // 미래 일정
                .sorted(Comparator.comparing(CrewResponse::getPlanStartDate)) // 오름차순 정렬
                .collect(Collectors.toList());

        // 과거 일정 필터링
        List<CrewResponse> pastCrewResponses = allCrewResponses.stream()
                .filter(crewResponse -> crewResponse.getPlanStartDate().isBefore(today)) // 과거 일정
                .sorted(Comparator.comparing(CrewResponse::getPlanStartDate).reversed()) // 내림차순 정렬
                .collect(Collectors.toList());

        // 결과 합치기: 오늘 일정 -> 미래 일정 (오름차순) -> 과거 일정 (내림차순)
        todayCrewResponses.addAll(futureCrewResponses); // 오늘 일정 + 미래 일정
        todayCrewResponses.addAll(pastCrewResponses); // + 과거 일정

        return todayCrewResponses;
    }




    // 특정 일정 조회
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
