package com.ssafy.withme.global.interceptor;

import com.ssafy.withme.global.config.jwt.TokenProvider;
import com.ssafy.withme.global.config.jwt.constant.TokenType;
import com.ssafy.withme.global.error.ErrorCode;
import com.ssafy.withme.global.exception.AuthenticationException;
import com.ssafy.withme.global.util.AuthorizationUtils;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
@RequiredArgsConstructor
public class AuthenticationInterceptor implements HandlerInterceptor {

    private final TokenProvider tokenProvider;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        if (request.getMethod().equals("OPTIONS"))
            return true;

        String authorization = request.getHeader("Authorization");
        AuthorizationUtils.validateAuthorization(authorization);

        String accessToken = authorization.split(" ")[1];
        tokenProvider.validToken(accessToken);

        Claims claims = tokenProvider.getClaims(accessToken);
        String tokenType = claims.getSubject();

        if (!TokenType.isAccessToken(tokenType))
            throw new AuthenticationException(ErrorCode.NOT_ACCESS_TOKEN_TYPE);

        return true;
    }
}
