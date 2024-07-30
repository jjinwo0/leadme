package com.ssafy.withme.service.challege.response;

import com.ssafy.withme.domain.challenge.Challenge;
import com.ssafy.withme.domain.userchallenge.UserChallenge;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class ChallengeCreateResponse {

    private Long id;

    private String youtubeId;

    private String url;

    @Builder
    private ChallengeCreateResponse(Long id, String youtubeId, String url) {
        this.id = id;
        this.youtubeId = youtubeId;
        this.url = url;
    }

    public static ChallengeCreateResponse toResponse(Challenge challenge){
        return ChallengeCreateResponse.builder()
                .id(challenge.getId())
                .url(challenge.getUrl())
                .youtubeId(challenge.getYoutubeId())
                .build();
    }
}
