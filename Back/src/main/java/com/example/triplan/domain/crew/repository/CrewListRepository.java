package com.example.triplan.domain.crew.repository;

import com.example.triplan.domain.account.entity.Account;
import com.example.triplan.domain.crew.entity.Crew;
import com.example.triplan.domain.crew.entity.CrewList;
import com.example.triplan.domain.crew.enums.IsAccept;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CrewListRepository extends JpaRepository<CrewList, Long>{
    Optional<Object> findByCrewAndAccount(Crew crew, Account account);

    List<CrewList> findAllByAccount(Account account);

    Optional<CrewList> findByAccountAndCrewId(Account account, Long crewId);

    List<CrewList> findByAccountAndIsAccept(Account account, IsAccept isAccept);

    Optional<CrewList> findByCrewIdAndAccountAndIsAccept(Long crewId, Account account, IsAccept isAccept);

    List<CrewList> findByCrewAndIsAccept(Crew crew, IsAccept isAccept);

    @Query("SELECT cl.account.email FROM CrewList cl WHERE cl.crew.id = :crewId")
    List<String> findEmailsByCrewId(@Param("crewId") Long crewId);

    void deleteByCrew(Crew crew);
}


