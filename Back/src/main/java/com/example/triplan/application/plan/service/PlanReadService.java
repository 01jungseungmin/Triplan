package com.example.triplan.application.plan.service;

import com.example.triplan.application.account.service.AccountService;
import com.example.triplan.application.crew.dto.response.CrewResponse;
import com.example.triplan.application.plan.dto.response.PlanResponse;
import com.example.triplan.domain.account.entity.Account;
import com.example.triplan.domain.crew.entity.Crew;
import com.example.triplan.domain.crew.entity.CrewList;
import com.example.triplan.domain.crew.enums.IsAccept;
import com.example.triplan.domain.plan.entity.Plan;
import com.example.triplan.domain.plan.repository.PlanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PlanReadService {
    private final AccountService accountService;
    private final PlanRepository planRepository;
    // 로그인된 사용자의 모든 Plan 정보를 조회
    public List<PlanResponse> findAllPlansForCurrentUser(Long crewId) {
        Account account = accountService.getCurrentUser(); // 현재 로그인된 사용자 정보 가져오기
        List<Plan> plans = planRepository.findAllByCrewIdAndCrewAccountId(crewId, account.getId()); // 해당 유저가 속한 Crew의 모든 Plan 조회
        return plans.stream()
                .map(plan -> new PlanResponse(
                        plan.getPlanDate(),
                        plan.getPlanStartTime(),
                        plan.getPlanMemo(),
                        plan.getRefId(),
                        plan.getPlaceType(),
                        plan.getCrew().getId()))
                .collect(Collectors.toList());
    }
}
