package com.ssafy.withme.controller.landmark;

import com.ssafy.withme.domain.landmark.LandMark;
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
    public List<LandMark> getAllLandMarks(@PathVariable String videoName) {
        System.out.println("request 들어왔는데요");
        return landmarkService.getLandMarkByVideoName(videoName);
    }
    @PostMapping("/api/v1/landmarks")
    public LandMark createLandMark(@RequestBody LandMark landMark) {
        System.out.println(landMark);
        return landmarkService.saveLandMark(landMark);
    }

    @DeleteMapping("/api/v1/landmarks/{id}")
    public void deleteLandMark(@PathVariable String id) {
        landmarkService.deleteLandMark(id);
    }


}
