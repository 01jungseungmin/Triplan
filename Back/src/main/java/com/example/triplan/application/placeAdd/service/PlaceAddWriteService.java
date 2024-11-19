package com.example.triplan.application.placeAdd.service;

import com.example.triplan.application.account.service.AccountService;
import com.example.triplan.application.placeAdd.dto.request.SetAccountPlaceRequest;
import com.example.triplan.domain.account.entity.Account;
import com.example.triplan.domain.crew.entity.Crew;
import com.example.triplan.domain.crew.entity.CrewList;
import com.example.triplan.domain.crew.repository.CrewListRepository;
import com.example.triplan.domain.crew.repository.CrewRepository;
import com.example.triplan.domain.placeadd.entity.PlaceAdd;
import com.example.triplan.domain.placeadd.repository.PlaceAddRepository;
import com.example.triplan.domain.plan.entity.Plan;
import com.example.triplan.domain.plan.repository.PlanRepository;
import com.example.triplan.exception.ErrorCode;
import com.example.triplan.exception.TriplanException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class PlaceAddWriteService {
    private final PlaceAddRepository placeAddRepository;
    private final AccountService accountService;
    private final PlanRepository planRepository;
    private final CrewListRepository crewListRepository;

    //사용자 장소 등록
//    public String setAccountPlace(SetAccountPlaceRequest setAccountPlaceRequest){
//        Account account = accountService.getCurrentUser();
//        CrewList crewLists = crewListRepository.findByAccountAndCrewId(account, setAccountPlaceRequest.getCrewId()).orElseThrow(() -> new TriplanException(ErrorCode.CREW_NOT_FOUND));
//        Plan plan  = new Plan(setAccountPlaceRequest.getPlanDate(), setAccountPlaceRequest.getPlanTime(), setAccountPlaceRequest.getMemo(), setAccountPlaceRequest.)
//
//        Plan plans = planRepository.findById(setAccountPlaceRequest.getPlanId()).orElseThrow(() -> new TriplanException(ErrorCode.PLAN_NOT_FOUNT));
//        PlaceAdd placeAdd = new PlaceAdd(setAccountPlaceRequest.getPlaceAddName(), setAccountPlaceRequest.getPlaceAddAddress(), setAccountPlaceRequest.getPlaceLatitude(), setAccountPlaceRequest.getPlaceLongitude(),
//                 setAccountPlaceRequest.getMemo(), plans);
//        plans.setPlanAdd(setAccountPlaceRequest.getMemo(), placeAdd);
//        placeAddRepository.save(placeAdd);
//        return "장소 등록 완료";
//    }
}
