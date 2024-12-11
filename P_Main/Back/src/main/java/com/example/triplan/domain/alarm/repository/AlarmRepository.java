package com.example.triplan.domain.alarm.repository;

import com.example.triplan.domain.account.entity.Account;
import com.example.triplan.domain.alarm.entity.Alarm;
import com.example.triplan.domain.crew.entity.CrewList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AlarmRepository extends JpaRepository<Alarm, Long>{

    List<Alarm> findAllByCrewListIn(List<CrewList> crewLists);

    Optional<Alarm> findByAccountAndId(Account account, Long alarmId);

    Optional<Alarm> findByCrewList(CrewList crewList);
}
