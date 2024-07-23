package com.ssafy.withme.global.response;

import com.ssafy.withme.domain.landmark.Landmark;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@AllArgsConstructor
@Data
public class Frame {

    private List<Keypoint> keypoints;

    public Frame(List<Keypoint> keypoints) {
        this.keypoints = keypoints;
    }
}
