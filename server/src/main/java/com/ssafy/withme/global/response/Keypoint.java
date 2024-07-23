package com.ssafy.withme.global.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
public class Keypoint {
    private double x, y, z;

    public Keypoint(double x, double y, double z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}
