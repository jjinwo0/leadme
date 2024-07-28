package com.ssafy.withme.controller.userchallenege;

import com.ssafy.withme.controller.userchallenege.request.UserChallengeAnalyzeRequest;
import com.ssafy.withme.global.response.ApiResponse;
import com.ssafy.withme.global.response.SuccessResponse;
import com.ssafy.withme.service.userchellenge.UserChallengeService;
import com.ssafy.withme.service.userchellenge.response.UserChallengeAnalyzeResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
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
    @PostMapping("/api/v1/userChallenge/analyze")
    public ApiResponse<UserChallengeAnalyzeResponse> createUserChallenge(@RequestPart("request") UserChallengeAnalyzeRequest request,
                                                                         @RequestPart MultipartFile videoFile) throws IOException {

        return SuccessResponse.of(userChallengeService.analyzeVideo(request, videoFile));
    }

//    @PostMapping

}
