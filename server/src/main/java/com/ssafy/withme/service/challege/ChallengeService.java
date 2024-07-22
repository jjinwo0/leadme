package com.ssafy.withme.service.challege;

import com.ssafy.withme.controller.challenge.request.ChallengeCreateRequest;
import com.ssafy.withme.domain.challenge.Challenge;
import com.ssafy.withme.repository.Challenge.ChallengeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;

@RequiredArgsConstructor
@Service
public class ChallengeService {

    static final String FAST_API_URL = "http://localhost:8000/videoUrl";
    private final ChallengeRepository challengeRepository;


    private final RestTemplate restTemplate;

    public void createChallenge(ChallengeCreateRequest request){
        Challenge challenge = request.toEntity();
        challengeRepository.save(challenge);

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);


        HashMap<String, String> requestBody = new HashMap<>();
        requestBody.put("url", challenge.getUrl());

        HttpEntity<HashMap<String, String>> CreateLandMarkDataRequest = new HttpEntity<>(requestBody, httpHeaders);
        restTemplate.postForEntity(FAST_API_URL, CreateLandMarkDataRequest, String.class);
    }
}
