package com.ssafy.withme.repository.Challenge;

import com.ssafy.withme.domain.challenge.Challenge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChallengeRepository extends JpaRepository<Challenge, Long> {
    Challenge findByVideoName(String videoName);
}
