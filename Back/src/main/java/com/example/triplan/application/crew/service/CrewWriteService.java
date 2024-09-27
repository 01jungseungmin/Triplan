package com.example.triplan.application.crew.service;

import com.example.triplan.application.crew.dto.request.CrewRequest;
import com.example.triplan.application.crew.dto.response.CrewResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
@Transactional
public class CrewWriteService {
    public CrewResponse create(Long accountId, CrewRequest crewRequest) {

        return null;
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
