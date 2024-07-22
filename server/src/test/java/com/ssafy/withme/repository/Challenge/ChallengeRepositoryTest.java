package com.ssafy.withme.repository.Challenge;

import com.ssafy.withme.domain.challenge.Challenge;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;

import static org.assertj.core.api.Assertions.*;

@ActiveProfiles("test")
@SpringBootTest
class ChallengeRepositoryTest {

    @Autowired
    private ChallengeRepository challengeRepository;

    @DisplayName("비디오이름으로 챌린지를 조회합니다.")
    @Test
    void test(){
        //given
        String findVideoName = "새삥";
        Challenge challenge = createChallenge(findVideoName);
        Challenge challenge2 = createChallenge("헤이마마");


        challengeRepository.saveAll(
                List.of(challenge,challenge2)
        );
        //when
        Challenge findChallenge = challengeRepository.findByVideoName(findVideoName);

        //then
        assertThat(findChallenge.getVideoName()).isEqualTo(findVideoName);

    }

    private static Challenge createChallenge(String videoName) {
        return Challenge.builder()
                .videoName(videoName)
                .url("url")
                .build();
    }
}