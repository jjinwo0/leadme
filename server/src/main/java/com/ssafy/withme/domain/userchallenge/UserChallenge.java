package com.ssafy.withme.domain.userchallenge;

import com.ssafy.withme.domain.challenge.Challenge;
import com.ssafy.withme.domain.comment.Comment;
import com.ssafy.withme.domain.user.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

import static jakarta.persistence.FetchType.LAZY;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class UserChallenge {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String videoPath;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name="challenge_id")
    private Challenge challenge;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "users_id")
    private User user;

    @OneToMany(mappedBy = "userChallenge", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<Comment> comments = new ArrayList<>();

    @Builder
    private UserChallenge(String name, String videoPath, Challenge challenge, User user) {
        this.name = name;
        this.videoPath = videoPath;
        this.challenge = challenge;
        this.user = user;
    }
}
