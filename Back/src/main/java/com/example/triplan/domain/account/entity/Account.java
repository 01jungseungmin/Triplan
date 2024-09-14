package com.example.triplan.domain.account.entity;

import com.example.triplan.common.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Set;

@Entity
@Data
@EntityListeners({AuditingEntityListener.class})
@AllArgsConstructor
@NoArgsConstructor
public class Account{
    @Id
    @Column(name = "userid")
    @GeneratedValue(strategy = GenerationType.UUID)
    private String userid;

    @Column(name = "email", unique = true, nullable = false)
    private String email;

    @Column(name = "nickName", nullable = false)
    private String nickName;

    @Column(name ="password", nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(name ="role", nullable = false)
    private Role role;

    @CreatedDate
    @Column(updatable = false, nullable = false)
    protected LocalDateTime createdAt;

    @LastModifiedDate
    @Column(nullable = true)
    protected LocalDateTime updatedAt;

    public Set<Role> getRoles() {
        return Collections.singleton(this.role);
    }
}