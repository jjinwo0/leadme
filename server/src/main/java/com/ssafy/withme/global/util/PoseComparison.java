package com.ssafy.withme.global.util;

import com.ssafy.withme.global.response.Frame;
import com.ssafy.withme.global.response.Keypoint;

import java.util.ArrayList;
import java.util.List;

/**
 * 유클리드 정규화 및 코사인 유사도 측정을 진행하는 클래스
 */
public class PoseComparison {
    // L2 정규화 학습
    public static List<Keypoint> l2Normalize(List<Keypoint> pose) {
        double sumOfSquare = 0;
        for(Keypoint kp : pose) {
            sumOfSquare += kp.getX() * kp.getX() + kp.getY() * kp.getY() + kp.getZ() * kp.getZ();
        }
        double l2Norm = Math.sqrt(sumOfSquare);

        List<Keypoint> normalized = new ArrayList<Keypoint>();

        for(Keypoint kp : pose) {
            normalized.add(new Keypoint(
                    kp.getX() / l2Norm,
                    kp.getY() / l2Norm,
                    kp.getZ()/ l2Norm
            ));
        }

        return normalized;
    }

    // 코사인 유사도 계산 함수
    public static double cosinSimilarity(List<Keypoint> pose1, List<Keypoint> pose2) {

        double dotProduct = 0.0;
        for(int i = 0; i < pose1.size(); i++) {
            Keypoint kp1 = pose1.get(i);
            Keypoint kp2 = pose2.get(i);
            dotProduct += kp1.getX() * kp2.getX() + kp1.getY() * kp2.getY() + kp1.getZ() * kp2.getZ();
        }

        // 정규화를 사전에 수행했기 때문에 분모인 두 벡터의 크기는 1*1이다.
        return (dotProduct * 50 ) + 50;
    }

    // 평균 점수 게산
    public static double calcuatePoseScore(List<Frame> userVideoFrames, List<Frame> challengeFrames) {
        double totalScore = 0.0;
        int totalFrameCount = challengeFrames.size();

        for(int i = 0; i < totalFrameCount; i++) {

            Frame userFrame = userVideoFrames.get(i);
            Frame challengeFrame = challengeFrames.get(i);

            if(userFrame == null) continue;

            for(int j = 0; j < userFrame.getKeypoints().size(); j++) {
                List<Keypoint> userL2Keypoints = l2Normalize(userFrame.getKeypoints());
                List<Keypoint> userL2ChallengeKeypoints = l2Normalize(challengeFrame.getKeypoints());

                totalScore += cosinSimilarity(userL2Keypoints, userL2ChallengeKeypoints);
            }
        }

        totalScore = totalScore / totalFrameCount;
        return totalScore;
    }
}
