package com.ssafy.withme.api.service.user;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class JwtToken {

    private String accessToken;
    private String refreshToken;
}
