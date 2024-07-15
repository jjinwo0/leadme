package com.ssafy.withme.domain.user;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Getter
@Setter
@ConfigurationProperties(prefix = "auth")
@Component
public class AuthProperties {

    //
    private String redirectUrl;

    // 암호화 키
    private String secretKey;

    // accessToken 만료 시간
    private long tokenExpiry;

    // refreshToken 만료 시간
    private long refreshTokenExpiry;
}
