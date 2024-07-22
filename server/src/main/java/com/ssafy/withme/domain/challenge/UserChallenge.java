package com.ssafy.withme.domain.challenge;

import com.ssafy.withme.domain.BaseEntity;
import com.ssafy.withme.domain.comment.Comment;
import com.ssafy.withme.domain.user.User;
import com.ssafy.withme.domain.video.Video;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserChallenge extends BaseEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_challenge_id")
    private Long id;

    private String challengeUrl;

    private String challengeName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "video_id")
    private Video video;

    @OneToMany(mappedBy = "userChallenge", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<Comment> commentList;

    @Builder
    public UserChallenge(String challengeUrl, String challengeName, User user, Video video) {
        this.challengeUrl = challengeUrl;
        this.challengeName = challengeName;
        this.user = user;
        this.video = video;
        this.commentList = new ArrayList<>();
    }
}
