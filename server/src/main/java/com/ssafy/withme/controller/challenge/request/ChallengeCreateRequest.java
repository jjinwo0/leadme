package com.ssafy.withme.controller.challenge.request;

import com.ssafy.withme.domain.challenge.Challenge;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class ChallengeCreateRequest {

    private String youtubeId;

    private String url;

    public Challenge toEntity() {
        return Challenge.builder()
                .youtubeId(youtubeId)
                .url(url)
                .build();

    }
}
