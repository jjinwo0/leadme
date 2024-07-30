package com.ssafy.withme.repository.userchallenge;

import com.ssafy.withme.domain.userchallenge.UserChallenge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserChallengeRepository extends JpaRepository<UserChallenge, Long> {
}
