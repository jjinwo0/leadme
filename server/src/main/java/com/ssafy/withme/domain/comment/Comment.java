package com.ssafy.withme.domain.comment;

import com.ssafy.withme.domain.BaseEntity;
import com.ssafy.withme.domain.user.User;
import com.ssafy.withme.domain.userchallenge.UserChallenge;
import com.ssafy.withme.domain.usercomment.UserCommentLike;
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
public class Comment extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String content;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "users_id")
    private User user;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "user_challenge_id")
    private UserChallenge userChallenge;

    @OneToMany(mappedBy = "comment", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<UserCommentLike> userCommentLikes = new ArrayList<>();

    @Builder
    public Comment(String content, User user, UserChallenge userChallenge, List<UserCommentLike> userCommentLikes) {
        this.content = content;
        this.user = user;
        this.userChallenge = userChallenge;
        this.userCommentLikes = userCommentLikes;
    }
}
