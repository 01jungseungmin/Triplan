package com.example.triplan.domain.alarm.repository;

import com.example.triplan.domain.account.entity.Account;
import com.example.triplan.domain.alarm.entity.Alarm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AlarmRepository extends JpaRepository<Alarm, Long>{
}
