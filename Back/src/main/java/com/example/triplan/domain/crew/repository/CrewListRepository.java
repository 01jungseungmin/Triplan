package com.example.triplan.domain.crew.repository;

import com.example.triplan.domain.account.entity.Account;
import com.example.triplan.domain.crew.entity.Crew;
import com.example.triplan.domain.crew.entity.CrewList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CrewListRepository extends JpaRepository<CrewList, Long>{
    Optional<Object> findByCrewAndAccount(Crew crew, Account account);
}
