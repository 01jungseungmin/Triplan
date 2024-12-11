package com.example.triplan.application.plan.service;

import com.example.triplan.application.account.service.AccountService;
import com.example.triplan.application.plan.dto.response.PlanResponse;
import com.example.triplan.domain.account.entity.Account;
import com.example.triplan.domain.place.entity.Place;
import com.example.triplan.domain.place.repository.PlaceRepository;
import com.example.triplan.domain.placeadd.entity.PlaceAdd;
import com.example.triplan.domain.placeadd.repository.PlaceAddRepository;
import com.example.triplan.domain.plan.entity.Plan;
import com.example.triplan.domain.plan.enums.PlaceType;
import com.example.triplan.domain.plan.repository.PlanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PlanReadService {
    private final AccountService accountService;
    private final PlanRepository planRepository;
    private final PlaceRepository placeRepository;
    private final PlaceAddRepository placeAddRepository;
    // 로그인된 사용자의 모든 Plan 정보를 조회
    public List<PlanResponse> findAllPlansForCurrentUser(Long crewId) {
        Account account = accountService.getCurrentUser();
        List<Plan> plans = planRepository.findAllByCrewIdAndAccountId(crewId, account.getId());

        return plans.stream()
                .map(plan -> {
                    String placeName = "알 수 없음";
                    String placeAddress = "주소 없음";

                    // 장소 정보 조회
                    if (plan.getPlaceType() == PlaceType.PLACE) {
                        Place place = placeRepository.findById(plan.getRefId()).orElse(null);
                        if (place != null) {
                            placeName = place.getPlaceName();
                            placeAddress = place.getPlaceAddress();
                        }
                    } else if (plan.getPlaceType() == PlaceType.PLACE_ADD) {
                        PlaceAdd placeAdd = placeAddRepository.findById(plan.getRefId()).orElse(null);
                        if (placeAdd != null) {
                            placeName = placeAdd.getPlaceAddName();
                            placeAddress = placeAdd.getPlaceAddAddress();
                        }
                    }

                    // Crew ID 가져오기
                    Long crewIdForResponse = plan.getCrew() != null ? plan.getCrew().getId() : null;

                    return new PlanResponse(plan, placeName, placeAddress); // 수정된 생성자 사용

                })
                .collect(Collectors.toList());
    }
}
