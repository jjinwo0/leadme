package com.ssafy.withme.service.userchellenge.response;

import lombok.Builder;
import lombok.Getter;


@Getter
public class UserChallengeAnalyzeResponse {

    private double score;

    private String uuid;

    @Builder
    private UserChallengeAnalyzeResponse(double score, String uuid) {
        this.score = score;
        this.uuid = uuid;
    }
}
