package com.example.triplan.application.crew.service;

import com.example.triplan.application.account.service.AccountService;
import com.example.triplan.application.crew.dto.request.CrewRequest;
import com.example.triplan.application.crew.dto.response.CrewResponse;
import com.example.triplan.domain.account.entity.Account;
import com.example.triplan.domain.crew.entity.Crew;
import com.example.triplan.domain.crew.entity.CrewList;
import com.example.triplan.domain.crew.enums.IsAccept;
import com.example.triplan.domain.crew.repository.CrewListRepository;
import com.example.triplan.domain.crew.repository.CrewRepository;
import com.example.triplan.domain.plan.repository.PlanRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;

@Service
@AllArgsConstructor
@Transactional
public class CrewWriteService {

    private final CrewRepository crewRepository;
    private final CrewListRepository crewListRepository;
    private final PlanRepository planRepository;
    private final AccountService accountService;

    public CrewResponse create(CrewRequest crewRequest){
        Account account = accountService.getCurrentUser();
        Crew crew = new Crew(crewRequest.getCrewName(), crewRequest.getPlanStartDate(), crewRequest.getPlanEndDate(), account);

        CrewList crewList = new CrewList(crew, account, IsAccept.ACCEPT);
        crewListRepository.save(crewList);
        return new CrewResponse(crewRepository.save(crew)); // DTO 반환
    }

    public String modifyCrew(Long accountId, Long crewId,String crewName, LocalDate planStartDate, LocalDate planEndDate) {

        return null;
    }

    // 그룹 삭제 메서드
    public void delete(Long crewId) {
        Account account = accountService.getCurrentUser();

        Crew crew = crewRepository.findById(crewId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "그룹을 찾을 수 없습니다."));

        // 현재 사용자가 해당 그룹에 대한 CrewList 항목을 가지고 있는지 확인
        CrewList crewList = (CrewList) crewListRepository.findByCrewAndAccount(crew, account)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.FORBIDDEN, "초대받지 않은 그룹입니다."));

        if (!crewList.getIsAccept().equals(IsAccept.ACCEPT)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "초대를 수락해주세요.");
        }

        // 관련된 CrewList 삭제
        crewListRepository.deleteByCrew(crew);

        // 해당 Crew에 속한 Plan 삭제
        planRepository.deleteAllByCrew(crew);

        // Crew 삭제
        crewRepository.delete(crew);
    }

}
