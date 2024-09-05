package com.example.triplan.application.plan.service;

import com.example.triplan.application.account.service.AccountService;
import com.example.triplan.application.plan.dto.request.PlanRequest;
import com.example.triplan.domain.account.entity.Account;
import com.example.triplan.domain.crew.entity.Crew;
import com.example.triplan.domain.crew.entity.CrewList;
import com.example.triplan.domain.crew.enums.IsAccept;
import com.example.triplan.domain.crew.repository.CrewListRepository;
import com.example.triplan.domain.crew.repository.CrewRepository;
import com.example.triplan.domain.place.entity.Place;
import com.example.triplan.domain.place.repository.PlaceRepository;
import com.example.triplan.domain.placeadd.repository.PlaceAddRepository;
import com.example.triplan.domain.plan.entity.Plan;
import com.example.triplan.domain.plan.enums.PlaceType;
import com.example.triplan.domain.plan.repository.PlanRepository;
import com.example.triplan.exception.ErrorCode;
import com.example.triplan.exception.TriplanException;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
@AllArgsConstructor
@Transactional
public class PlanWriteService {

    private final AccountService accountService;
    private final PlaceRepository placeRepository;
    private final CrewRepository crewRepository;
    private final CrewListRepository crewListRepository;
    private final PlanRepository planRepository;
    private final PlaceAddRepository placeAddRepository;

    //그룹 예외처리
    private void validateCrewListAccess(Crew crew, Account account) {
        CrewList crewList = (CrewList) crewListRepository.findByCrewAndAccount(crew, account)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.FORBIDDEN, "초대받지 않은 그룹입니다."));
        if (!crewList.getIsAccept().equals(IsAccept.ACCEPT)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "초대를 수락해주세요.");
        }
    }

    //장소 예외처리
    private Place validateFindPlaceById(Long placeId) {
        return placeRepository.findById(placeId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "장소를 찾을 수 없습니다."));
    }

    // 일정 조회 메서드
    private Plan validatefindPlanById(Long planId) {
        return planRepository.findById(planId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "일정을 찾을 수 없습니다."));
    }

    // 일정 생성 메서드
    public Plan create(PlanRequest planRequest) {
        Account account = accountService.getCurrentUser();

        // Place 또는 PlaceAdd의 ID를 refId로 받음
        Long refId = planRequest.getRefId();
        PlaceType placeType = planRequest.getPlaceType(); // PlaceType을 추가하여 어떤 타입의 장소인지 구분

        Crew crew = crewRepository.findById(planRequest.getCrewId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "그룹을 찾을 수 없습니다."));

        validateCrewListAccess(crew, account);

        planRepository.findByCrewAndPlanDateAndPlanStartTime(crew, planRequest.getPlanDate(), planRequest.getPlanStartTime())
                .ifPresent(plan -> {
                    throw new ResponseStatusException(HttpStatus.CONFLICT, "이미 존재하는 일정입니다.");
                });

        if (placeType == PlaceType.PLACE) {
            Place place = placeRepository.findById(refId)
                    .orElseThrow(() -> new TriplanException(ErrorCode.PLACE_NOT_FOUND));
            place.incrementCount();
            placeRepository.save(place);
        } else if (placeType == PlaceType.PLACE_ADD) {
            if (!placeAddRepository.existsById(refId)) {
                throw new TriplanException(ErrorCode.PLACE_ADD_NOT_FOUND);
            }
        } else {
            throw new TriplanException(ErrorCode.INVALID_PLACE_TYPE);
        }

        Plan plan = new Plan(
                        planRequest.getPlanDate(),
                        planRequest.getPlanStartTime(),
                        planRequest.getPlanMemo(),
                crew,
                refId,
                placeType
                );

        return planRepository.save(plan);
    }

    // 일정 수정 메서드
    public PlanRequest modify(Long planId, PlanRequest planRequest) {
        Account account = accountService.getCurrentUser();
        Plan plan = validatefindPlanById(planId);
        Crew crew = plan.getCrew();

        validateCrewListAccess(crew, account);

        // 장소 수정: placeId를 받아서 refId와 placeType을 설정
        if (planRequest.getRefId() != null) {
            Long refId = planRequest.getRefId();
            PlaceType placeType = planRequest.getPlaceType(); // 새로 들어온 placeType

            plan.setRefId(refId);
            plan.setPlaceType(placeType); // placeType을 수정
        }

        // 날짜, 시간, 메모 수정
        plan.setPlanDate(planRequest.getPlanDate());
        plan.setPlanStartTime(planRequest.getPlanStartTime());
        plan.setPlanMemo(planRequest.getPlanMemo());


        Plan updatedPlan = planRepository.save(plan);

        return new PlanRequest(updatedPlan.getPlanDate(), updatedPlan.getPlanStartTime(), updatedPlan.getPlanMemo(),
                updatedPlan.getRefId(), updatedPlan.getPlaceType(), updatedPlan.getCrew().getId());
    }

    // 일정 삭제 메서드
    public void delete(Long planId) {
        Account account = accountService.getCurrentUser();
        Plan plan = validatefindPlanById(planId);
        Crew crew = plan.getCrew();

        validateCrewListAccess(crew, account);

        if (plan.getPlaceType() == PlaceType.PLACE_ADD){
            Long placeAddId = plan.getRefId();
            placeAddRepository.deleteById(placeAddId);
        }
        planRepository.delete(plan);
    }
}