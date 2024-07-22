package com.ssafy.withme.controller.challenge.request;

import com.ssafy.withme.domain.challenge.Challenge;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class ChallengeCreateRequest {

    private String videoName;

    private String url;

    public Challenge toEntity() {
        return Challenge.builder()
                .videoName(videoName)
                .url(url)
                .build();

    }
}
