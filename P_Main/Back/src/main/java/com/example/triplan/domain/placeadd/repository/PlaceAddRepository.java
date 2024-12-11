package com.example.triplan.domain.placeadd.repository;

import com.example.triplan.domain.account.entity.Account;
import com.example.triplan.domain.placeadd.entity.PlaceAdd;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PlaceAddRepository extends JpaRepository<PlaceAdd, Long>{
}
