package com.ssafy.withme.controller.userchallenege;

import com.ssafy.withme.controller.userchallenege.request.UserChallengeCreateRequest;
import com.ssafy.withme.service.userchellenge.UserChallengeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RequiredArgsConstructor
@RestController
public class UserChallengeController {

    private final UserChallengeService userChallengeService;
    // 유저의 스켈레톤 데이터를 받아와서 알고리즘으로 분석률을 반환한다.
    @PostMapping("/api/v1/userChallenge")
    public void createUserChallenge(@RequestPart("request") UserChallengeCreateRequest request,
                                    @RequestPart MultipartFile videoFile) throws IOException {

        userChallengeService.createUserChallenge(request, videoFile);
    }

}
