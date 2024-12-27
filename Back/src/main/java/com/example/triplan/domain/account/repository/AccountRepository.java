package com.example.triplan.domain.account.repository;

import aj.org.objectweb.asm.commons.Remapper;
import com.example.triplan.domain.account.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long>{

    Account findByEmail(String email);

    Optional<Account> findOneWithRolesByEmail(String email);

    boolean existsByEmail(String email);
}
