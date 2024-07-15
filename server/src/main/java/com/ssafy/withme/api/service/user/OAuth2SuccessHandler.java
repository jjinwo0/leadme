package com.ssafy.withme.api.service.user;

import com.ssafy.withme.domain.user.User;
import com.ssafy.withme.repository.user.UserRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;


@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtTokenService jwtTokenService;
    private final UserRepository userRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        // 무슨 작업을 할거냐
        // => OAuth 인증이 성공하면 이 메서드가 받게된다.
        CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();

        String oauthId = oAuth2User.getName();
        User user = userRepository.findByOauthId(oauthId);
        JwtToken newToken = jwtTokenService.generateToken(user);
        System.out.println(newToken);

//        response.setHeader("Authorization", "Bearer " + newToken.getAccessToken());
//        response.setHeader("RefreshToken", "Bearer " + newToken.getRefreshToken());
        /**
         * 나는 리프레시토큰으로 헤더에 넘기는 방식을 사용하고있지만,
         * 일단 accessToken만 넘기는 식으로 구현하고 나중에 수정예정.
         */
//        request.
//        RequestDispatcher requestDispatcher
//        response.f("/login");
        System.out.println(newToken.getAccessToken());
    }
}