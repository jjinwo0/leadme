package com.ssafy.withme.repository.challenge;

import com.ssafy.withme.domain.challenge.Challenge;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChallengeRepository extends JpaRepository<Challenge, Long> {
}
