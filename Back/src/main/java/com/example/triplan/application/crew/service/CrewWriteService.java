package com.example.triplan.application.crew.service;

import com.example.triplan.application.account.service.AccountService;
import com.example.triplan.application.crew.dto.request.CrewRequest;
import com.example.triplan.domain.account.entity.Account;
import com.example.triplan.domain.crew.entity.Crew;
import com.example.triplan.domain.crew.repository.CrewRepository;
import com.example.triplan.exception.CustomAuthenticationException;
import org.springframework.security.core.AuthenticationException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
@AllArgsConstructor
@Transactional
public class CrewWriteService {

    private final CrewRepository crewRepository;
    private final AccountService accountService;

    public Crew create(CrewRequest crewRequest) throws CustomAuthenticationException{
        Account account = accountService.getCurrentUser();
        if (account == null) {
            throw new CustomAuthenticationException("로그인이 필요합니다."); // 예외 발생
        }

        Crew crew = new Crew(crewRequest.getCrewName(), crewRequest.getPlanStartDate(), crewRequest.getPlanEndDate(), account);
        return crewRepository.save(crew);
    }

    public void sendEmail(String email, String crewName, String nickName) {

    }
    public String setInviteCrew(Long accountId, Long crewId, String email) {

        return null;
    }

    public String modifyCrew(Long accountId, Long crewId,String crewName, LocalDate planStartDate, LocalDate planEndDate) {

        return null;
    }
}
