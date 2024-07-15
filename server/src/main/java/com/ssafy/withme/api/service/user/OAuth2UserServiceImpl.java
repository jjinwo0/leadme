package com.ssafy.withme.api.service.user;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.withme.domain.user.User;
import com.ssafy.withme.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Map;


@Service
@RequiredArgsConstructor
public class OAuth2UserServiceImpl extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest request) throws OAuth2AuthenticationException {

        OAuth2User oauth2User = super.loadUser(request);
        System.out.println(oauth2User);
        String oauthClientName = request.getClientRegistration().getClientName();
        try{
            System.out.println(new ObjectMapper().writeValueAsString(oauth2User.getAttributes()));
        }catch (Exception exception){
            exception.printStackTrace();
        }

        User user = null;
        String oauthId = null;
        String email = "email@email.com";
        String nickname = null;

        if(oauthClientName.equals("kakao")){
            oauthId = "kakao_" + oauth2User.getAttributes().get("id");
            nickname = oauthId;
            user = User.builder()
                    .oauthId(oauthId)
                    .email("email@email.com")
                    .loginType("kakao")
                    .build();
        }else if(oauthClientName.equals("naver")){
            Map<String, String> responseMap = (Map<String, String>)oauth2User.getAttributes().get("response");
            oauthId= "naver_" + responseMap.get("id").substring(0,14);
            email = responseMap.get("email");
            nickname = oauthId;
            user = User.builder()
                    .oauthId(oauthId)
                    .email("email@email.com")
                    .loginType("naver")
                    .build();
        }
        if(userRepository.findByOauthId(oauthId) != null){
            return new CustomOAuth2User(oauthId);
        }
        userRepository.save(user);

        return new CustomOAuth2User(oauthId);
    }
}
