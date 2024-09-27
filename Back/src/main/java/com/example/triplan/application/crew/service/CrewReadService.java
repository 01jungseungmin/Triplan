package com.example.triplan.application.crew.service;

import com.example.triplan.application.crew.dto.response.CrewResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CrewReadService {
    public CrewResponse findAllCrew(Long accountId) {

        return null;
    }

    public CrewResponse findCrew(Long accountId,Long crewId) {

        return null;
    }

}
