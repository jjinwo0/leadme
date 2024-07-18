package com.ssafy.withme.service.landmark;

import com.ssafy.withme.domain.landmark.LandMark;
import com.ssafy.withme.repository.landmark.LandmarkRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class LandmarkService {

    private final LandmarkRepository landmarkRepository;

    public List<LandMark> getAllLandMarks() {
        return landmarkRepository.findAll();
    }

    public LandMark getLandMarkById(String id) {
        return landmarkRepository.findById(id).orElse(null);
    }

    public LandMark saveLandMark(LandMark landMark) {
        return landmarkRepository.save(landMark);
    }

    public void deleteLandMark(String id) {
        landmarkRepository.deleteById(id);
    }
}
