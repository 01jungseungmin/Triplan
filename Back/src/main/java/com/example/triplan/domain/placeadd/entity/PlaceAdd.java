package com.example.triplan.domain.placeadd.entity;

import com.example.triplan.common.BaseEntity;
import com.example.triplan.domain.account.entity.Account;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;

@Entity
@Getter
public class PlaceAdd extends BaseEntity {
    @Column(name = "placeAddName", nullable = false)
    private String placeAddName;

    @Column(name = "placeAddAddress", nullable = false)
    private String placeAddAddress;

    @Column(name = "placeAddLatitude", nullable = false)
    private String placeAddLatitude;

    @Column(name = "placeAddLongitude", nullable = false)
    private String placeAddLongitude;

    @ManyToOne
    @JoinColumn(name = "account_id")
    private Account account;
}
