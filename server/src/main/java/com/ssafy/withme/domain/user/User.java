package com.ssafy.withme.domain.user;

import com.ssafy.withme.domain.BaseEntity;
import com.ssafy.withme.domain.user.constant.RoleType;
import com.ssafy.withme.domain.user.constant.UserStatus;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity(name = "users")
public class User extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String nickname;

    private String email;

    private String gender;

    private String age;

    @Enumerated(EnumType.STRING)
    private RoleType roleType;

    private String profileImg;

    private String profileComment;

    private LocalDateTime loginDateTime;

    @Enumerated(EnumType.STRING)
    private UserStatus userStatus;

    @Builder
    public User(String email, String name) {
        this.email = email;
        this.name  = name;
    }

    public User update(String name) {
        this.name = name;
        return this;
    }

    public void updateStatus(UserStatus status) {

        this.userStatus = status;
    }
}
