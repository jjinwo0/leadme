package com.ssafy.withme.domain.comment;

import com.ssafy.withme.domain.BaseEntity;
import com.ssafy.withme.domain.challenge.UserChallenge;
import com.ssafy.withme.domain.user.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Comment extends BaseEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "comment_user_id", foreignKey = @ForeignKey(name = "fk_comment_user"))
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_challenge_id")
    private UserChallenge userChallenge;

    @Builder
    public Comment(String content, User user, UserChallenge userChallenge) {
        this.content = content;
        this.user = user;
        this.userChallenge = userChallenge;
    }
}
