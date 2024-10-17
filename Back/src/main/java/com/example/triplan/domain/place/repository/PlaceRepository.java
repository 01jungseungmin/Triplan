package com.example.triplan.domain.place.repository;

import com.example.triplan.domain.account.entity.Account;
import com.example.triplan.domain.place.entity.Place;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlaceRepository extends JpaRepository<Place, Long>{

}
