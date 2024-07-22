package com.ssafy.withme.controller.challenge;

import com.ssafy.withme.controller.challenge.request.ChallengeCreateRequest;
import com.ssafy.withme.service.challege.ChallengeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class ChallengeController {

    private final ChallengeService challengeService;

    @PostMapping("/api/v1/challenge")
    public void createChallenge(@RequestBody ChallengeCreateRequest request){
        challengeService.createChallenge(request);
    }


}
