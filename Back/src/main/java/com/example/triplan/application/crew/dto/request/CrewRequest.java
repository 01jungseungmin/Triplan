package com.example.triplan.application.crew.dto.request;

import com.example.triplan.domain.account.entity.Account;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class CrewRequest {
    private String crewName;
    private LocalDate planStartDate;
    private LocalDate planEndDate;
    private Account account;
}