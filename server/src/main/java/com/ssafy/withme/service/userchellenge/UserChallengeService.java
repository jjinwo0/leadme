package com.ssafy.withme.service.userchellenge;

import com.ssafy.withme.controller.userchallenege.request.UserChallengeCreateRequest;
import com.ssafy.withme.domain.challenge.Challenge;
import com.ssafy.withme.global.exception.EntityNotFoundException;
import com.ssafy.withme.repository.challenge.ChallengeRepository;
import com.ssafy.withme.repository.userchallenge.UserChallengeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;

import static com.ssafy.withme.global.error.ErrorCode.NOT_EXISTS_CHALLENGE;

@RequiredArgsConstructor
@Service
public class UserChallengeService {


    static final String FAST_API_URL = "http://localhost:8000/videoUrl";

    private final UserChallengeRepository userChallengeRepository;

    private final ChallengeRepository challengeRepository;

    private final RestTemplate restTemplate;

    public void createUserChallenge(UserChallengeCreateRequest request, MultipartFile videoFile) throws EntityNotFoundException, IOException {
        Long challengeId = request.getChallengeId();
        Challenge challenge = challengeRepository.findById(challengeId).orElse(null);

        if(challenge == null){
            throw new EntityNotFoundException(NOT_EXISTS_CHALLENGE);
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("file", new org.springframework.core.io.ByteArrayResource(videoFile.getBytes()) {
            @Override
            public String getFilename() {
                return videoFile.getOriginalFilename();
            }
        });

        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        restTemplate.exchange(FAST_API_URL, HttpMethod.POST, requestEntity, String.class);
    }
}
