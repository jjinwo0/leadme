package com.ssafy.withme.service.userchellenge.response;

import com.ssafy.withme.domain.challenge.Challenge;
import com.ssafy.withme.domain.comment.Comment;
import com.ssafy.withme.domain.user.User;
import com.ssafy.withme.domain.userchallenge.UserChallenge;
import jakarta.persistence.*;
import lombok.Builder;

import java.util.List;

import static jakarta.persistence.FetchType.LAZY;

public class UserChallengeSaveResponse {

    private Long id;

    private String name;

    private Long challengeId;

    @Builder
    private UserChallengeSaveResponse(Long id, String name, Long challengeId) {
        this.id = id;
        this.name = name;
        this.challengeId = challengeId;
    }

    public static UserChallengeSaveResponse ofResponse(UserChallenge userChallenge) {
        return UserChallengeSaveResponse.builder()
                .name(userChallenge.getName())
                .challengeId(userChallenge.getChallenge().getId())
                .build();
    }

}
