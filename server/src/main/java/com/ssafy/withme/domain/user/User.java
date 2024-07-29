package com.ssafy.withme.domain.user;

import com.ssafy.withme.domain.BaseEntity;
import com.ssafy.withme.domain.user.constant.RoleType;
import com.ssafy.withme.domain.user.constant.UserStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.time.ZoneId;

@Getter
@Entity(name = "users")
@NoArgsConstructor
public class User extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String password;

    @Column(name = "nickname", unique = true)
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

//    @Builder
//    public User(String email, String name) {
//        this.email = email;
//        this.name  = name;
//    }
//
//    @Builder
//    public User(String email, String password, String nickname) {
//        this.email = email;
//        this.password = password;
//        this.nickname = nickname;
//    }

    public User update(String name) {
        this.name = name;
        return this;
    }

//    @Builder
//    public User(String name, String email, UserStatus userStatus) {
//        this.name = name;
//        this.email = email;
//        this.userStatus = userStatus;
//    }

    @Builder
    public User(String name, String password, String nickname, String email, String gender, String age, RoleType roleType, String profileImg, String profileComment, UserStatus userStatus) {
        this.name = name;
        this.password = password;
        this.nickname = nickname;
        this.email = email;
        this.gender = gender;
        this.age = age;
        this.roleType = roleType;
        this.profileImg = profileImg;
        this.profileComment = profileComment;
        this.userStatus = userStatus;
    }

    public void updateLoginTime() {

        this.loginDateTime = LocalDateTime.now(ZoneId.of("Asia/Seoul"));
    }
}
