package com.ssafy.withme.repository.Challenge;

import com.ssafy.withme.domain.challenge.Challenge;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChallengeRepository extends JpaRepository<Challenge, Long> {

    /**
     * 유튜브 ID로 챌린지 조회
    */
    Challenge findByYoutubeId(String youtubeId);
}
