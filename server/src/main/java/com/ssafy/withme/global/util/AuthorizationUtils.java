package com.ssafy.withme.global.util;

import com.ssafy.withme.global.config.jwt.constant.GrantType;
import com.ssafy.withme.global.error.ErrorCode;
import com.ssafy.withme.global.exception.AuthenticationException;
import org.springframework.util.StringUtils;

public class AuthorizationUtils {

    public static void validateAuthorization(String header) {

        if (!StringUtils.hasText(header))
            throw new AuthenticationException(ErrorCode.NOT_EXISTS_AUTHORIZATION);

        String[] authHeader = header.split(" ");

        if (authHeader.length < 2 || (!GrantType.BEARER.getType().equals(authHeader[0])))
            throw new AuthenticationException(ErrorCode.NOT_VALID_BEARER_GRANT_TYPE);
    }
}
