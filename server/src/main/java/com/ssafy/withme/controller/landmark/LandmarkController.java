package com.ssafy.withme.controller.landmark;

import com.ssafy.withme.domain.landmark.Landmark;
import com.ssafy.withme.service.landmark.LandmarkService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class LandmarkController {

    private final LandmarkService landmarkService;

    @GetMapping("/api/v1/landmarks/{videoName}")
    public Landmark findLandMarkByVideoName(@PathVariable String videoName) {
        return landmarkService.getLandMarkByVideoName(videoName);
    }

    @DeleteMapping("/api/v1/landmarks/{id}")
    public void deleteLandMark(@PathVariable String id) {
        landmarkService.deleteLandMark(id);
    }
}
