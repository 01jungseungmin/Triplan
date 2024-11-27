package com.example.triplan.application.plan.dto.request;

import com.example.triplan.domain.plan.enums.PlaceType;
import lombok.Getter;

@Getter
public class PlanDeleteRequest {
    private PlaceType placeType;
}
