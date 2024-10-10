package com.example.triplan.domain.account.entity;

import com.example.triplan.common.BaseEntity;
import com.example.triplan.domain.account.enums.Role;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collections;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
public class Account extends BaseEntity {

    @Column(name = "email", unique = true, nullable = false)
    private String email;

    @Column(name = "nickName", nullable = false)
    private String nickName;

    @Column(name ="password", nullable = false)
    private String password;

    public Account(String email, String nickName, String password, Role role) {
        this.email = email;
        this.nickName = nickName;
        this.password = password;
        this.role = role;
    }

    @Enumerated(EnumType.STRING)
    @Column(name ="role", nullable = false)
    private Role role;

    public Set<Role> getRoles() {
        return Collections.singleton(this.role);
    }

}