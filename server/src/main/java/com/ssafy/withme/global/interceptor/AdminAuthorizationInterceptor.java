package com.ssafy.withme.global.interceptor;

import com.ssafy.withme.domain.user.constant.RoleType;
import com.ssafy.withme.global.config.jwt.TokenProvider;
import com.ssafy.withme.global.error.ErrorCode;
import com.ssafy.withme.global.exception.AuthenticationException;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
@RequiredArgsConstructor
public class AdminAuthorizationInterceptor implements HandlerInterceptor {

    private final TokenProvider tokenProvider;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        if (request.getMethod().equals("OPTIONS"))
            return true;

        String authorization = request.getHeader("Authorization");
        String accessToken = authorization.split(" ")[1];

        Claims claims = tokenProvider.getClaims(accessToken);
        String role = (String) claims.get("role");

        if (!RoleType.isRoleType(role))
            throw new AuthenticationException(ErrorCode.FORBIDDEN_ADMIN);

        return true;
    }
}
