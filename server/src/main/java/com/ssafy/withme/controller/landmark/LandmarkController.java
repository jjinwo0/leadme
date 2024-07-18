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

    @GetMapping("/api/v1/landmarks")
    public List<LandMark> getAllLandMarks() {
        return landmarkService.getAllLandMarks();
    }

    @GetMapping("/api/v1/landmarks/{id}")
    public LandMark getLandMarkById(@PathVariable String id) {
        return landmarkService.getLandMarkById(id);
    }

    @PostMapping("/api/v1/landmarks")
    public LandMark createLandMark(@RequestBody LandMark landMark) {
        System.out.println(landMark);
        return landmarkService.saveLandMark(landMark);
    }

    @PutMapping("/api/v1/landmarks/{id}")
    public LandMark updateLandMark(@PathVariable String id, @RequestBody LandMark landMark) {
        landMark.setId(id);
        return landmarkService.saveLandMark(landMark);
    }

    @DeleteMapping("/api/v1/landmarks/{id}")
    public void deleteLandMark(@PathVariable String id) {
        landmarkService.deleteLandMark(id);
    }


}
