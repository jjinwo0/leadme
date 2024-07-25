package com.ssafy.withme.global.response;

import com.ssafy.withme.domain.landmark.Landmark;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@Data
public class Frame {

    private List<Keypoint> keypoints;

    public Frame(List<Keypoint> keypoints) {
        this.keypoints = keypoints;
    }
}
