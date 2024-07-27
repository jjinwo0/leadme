package com.ssafy.withme.service.userchellenge;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.withme.controller.userchallenege.request.UserChallengeCreateRequest;
import com.ssafy.withme.domain.challenge.Challenge;
import com.ssafy.withme.domain.landmark.Landmark;
import com.ssafy.withme.global.exception.EntityNotFoundException;
import com.ssafy.withme.global.response.Frame;
import com.ssafy.withme.global.response.Keypoint;
import com.ssafy.withme.global.util.PoseComparison;

import com.ssafy.withme.repository.challenge.ChallengeRepository;
import com.ssafy.withme.repository.landmark.LandmarkRepository;
import com.ssafy.withme.repository.userchallenge.UserChallengeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static com.ssafy.withme.global.error.ErrorCode.NOT_EXISTS_CHALLENGE;

@RequiredArgsConstructor
@Service
public class UserChallengeService {


    static final String FAST_API_URL = "http://localhost:8000/upload";

    private final UserChallengeRepository userChallengeRepository;

    private final ChallengeRepository challengeRepository;

    private final RestTemplate restTemplate;
    private final LandmarkRepository landmarkRepository;

    public void createUserChallenge(UserChallengeCreateRequest request, MultipartFile videoFile) throws EntityNotFoundException, IOException {
        Long challengeId = request.getChallengeId();
        Challenge challenge = challengeRepository.findById(challengeId).orElse(null);

        if(challenge == null){
            throw new EntityNotFoundException(NOT_EXISTS_CHALLENGE);
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("videoFile", new ByteArrayResource(videoFile.getBytes()) {
            @Override
            public String getFilename() {
                return videoFile.getOriginalFilename();
            }
        });
        body.add("filename", request.getName());
        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        // Fast API 반환값
        ResponseEntity<String> response = restTemplate.exchange(FAST_API_URL, HttpMethod.POST, requestEntity, String.class);
        System.out.println(response);
        String result = response.getBody();

        List<Frame> userFrames = deserialize(result);
        System.out.println(challenge.getYoutubeId());

        Landmark landmark = landmarkRepository.findByYoutubeId(challenge.getYoutubeId());
        List<Frame> challengeFrames = landmark.getLandmarks().stream()
                .map(keypoints -> keypoints.stream()
                        .map(p -> new Keypoint(p.getX(), p.getY(), p.getZ(), p.getVisibility()))
                        .collect(Collectors.toList()))
                .map(Frame::new)
                .collect(Collectors.toList());

        // 점수
        double score = PoseComparison.calculatePoseScore(userFrames, challengeFrames);
        System.out.println(score);

    }

    /**
     * 파이썬 서버에서 받아온 keypoints 값을 역직렬화 진행
     * @param jsonResponse
     * @return List<Frame>
     * @throws JsonProcessingException
     */
    public static List<Frame> deserialize(String jsonResponse) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();

        JsonNode rootNode = objectMapper.readTree(jsonResponse);
        JsonNode landmarkNode = rootNode.path("keypoints");

        List<Frame> frames = new ArrayList<>();

        // landmarks[]
        for(JsonNode frameNode : landmarkNode){
            List<Keypoint> keypoints = new ArrayList<>();

            // landmark[][]
            for(JsonNode keypointNode : frameNode) {
                double x = keypointNode.path("x").asDouble();
                double y = keypointNode.path("y").asDouble();
                double z = keypointNode.path("z").asDouble();
                double visibility  = keypointNode.path("visibility").asDouble();

                keypoints.add(new Keypoint(x, y, z, visibility));
            }
            frames.add(new Frame(keypoints));
        }
        return frames;
    }


}
