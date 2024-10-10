package com.example.triplan.application.plan.service;

import com.example.triplan.application.account.service.AccountService;
import com.example.triplan.application.crew.dto.request.CrewRequest;
import com.example.triplan.application.crew.dto.response.CrewResponse;
import com.example.triplan.application.plan.dto.request.PlanRequest;
import com.example.triplan.application.plan.dto.response.PlanResponse;
import com.example.triplan.domain.account.entity.Account;
import com.example.triplan.domain.crew.entity.Crew;
import com.example.triplan.domain.crew.entity.CrewList;
import com.example.triplan.domain.crew.enums.IsAccept;
import com.example.triplan.domain.crew.repository.CrewListRepository;
import com.example.triplan.domain.crew.repository.CrewRepository;
import com.example.triplan.domain.place.entity.Place;
import com.example.triplan.domain.place.repository.PlaceRepository;
import com.example.triplan.domain.plan.entity.Plan;
import com.example.triplan.domain.plan.repository.PlanRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
@AllArgsConstructor
@Transactional
public class PlanWriteService {

    private final AccountService accountService;
    private final PlaceRepository placeRepository;
    private final CrewRepository crewRepository;
    private final CrewListRepository crewListRepository;
    private final PlanRepository planRepository;


    public Plan create(PlanRequest planRequest) {
        Account account = accountService.getCurrentUser();

        Place place = placeRepository.findById(planRequest.getPlaceId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "장소를 찾을 수 없습니다."));

        Crew crew = crewRepository.findById(planRequest.getCrewId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "그룹을 찾을 수 없습니다."));

        CrewList crewList = (CrewList) crewListRepository.findByCrewAndAccount(crew, account)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.FORBIDDEN, "초대받지 않은 그룹입니다."));

        if (!crewList.getIsAccept().equals(IsAccept.ACCEPT)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "초대를 수락해주세요");
        }    planRepository.findByCrewAndPlanDateAndPlanStartTime(crew, planRequest.getPlanDate(), planRequest.getPlanStartTime())
                .ifPresent(plan -> {
                    throw new ResponseStatusException(HttpStatus.CONFLICT, "이미 존재하는 일정입니다.");
                });

        Plan plan = new Plan(planRequest.getPlanDate(),planRequest.getPlanStartTime(),planRequest.getPlanMemo(), place, crew);

        return planRepository.save(plan);
    }
    public PlanResponse modify(Long accountId, Long crewId) {

        return null;
    }
    public PlanResponse delete(Long accountId, Long crewId) {

        return null;
    }
}
