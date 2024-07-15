package com.ssafy.withme.repository.user;

import com.ssafy.withme.domain.user.User;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.*;


@ActiveProfiles("test")
@DataJpaTest
class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @DisplayName("oAuthId가 같은 유저를 조회한다")
    @Test
    void findByOauthId() {
        //given
        String oauthId = "test@naver.com";
        User user = createUser(oauthId);
        userRepository.save(user);

        //when
        User findUser = userRepository.findByOauthId(oauthId);

        //then
        Assertions.assertThat(findUser.getOauthId()).isEqualTo(oauthId);

    }

    private static User createUser(String oauthId) {
        return User.builder()
                .oauthId(oauthId)
                .build();
    }


}