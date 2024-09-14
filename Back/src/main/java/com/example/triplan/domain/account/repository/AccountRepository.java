package com.example.triplan.domain.account.repository;

import aj.org.objectweb.asm.commons.Remapper;
import com.example.triplan.domain.account.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, String>{

    Account findByEmail(String email);

    Optional<Account> findOneWithRolesByEmail(String email);
}
