package com.ssafy.withme.service.landmark;

import com.ssafy.withme.domain.challenge.Challenge;
import com.ssafy.withme.domain.landmark.Landmark;
import com.ssafy.withme.repository.Challenge.ChallengeRepository;
import com.ssafy.withme.repository.landmark.LandmarkRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class LandmarkService {

    private final ChallengeRepository  challengeRepository;
    private final LandmarkRepository landmarkRepository;

    public Landmark getLandMarkByVideoName(String videoName){
        Challenge challenge = challengeRepository.findByVideoName(videoName);
        String url = challenge.getUrl();
        Landmark findLandmark = landmarkRepository.findById(url).orElse(null);
        System.out.println(findLandmark);
        return findLandmark;

    }
    public List<Landmark> getAllLandMarks() {
        return landmarkRepository.findAll();
    }

    public Landmark getLandMarkById(String id) {
        return landmarkRepository.findById(id).orElse(null);
    }

    public Landmark saveLandMark(Landmark landMark) {
        return landmarkRepository.save(landMark);
    }

    public void deleteLandMark(String id) {
        landmarkRepository.deleteById(id);
    }
}
