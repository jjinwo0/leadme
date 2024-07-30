package com.ssafy.withme.controller.user;

import com.ssafy.withme.domain.user.User;
import com.ssafy.withme.service.user.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1")
public class UserController {

    private final UserService userService;

    @GetMapping("/user/me")
    public ResponseEntity<?> getInfo(HttpServletRequest request) {
        String authorization = request.getHeader("Authorization");
        User userInfo = null;
        if (authorization != null && authorization.startsWith("Bearer ")) {
//            String token = authorization.substring("Bearer ".length());
            String accessToken = authorization.split(" ")[1];

            userInfo = userService.findUserIdByToken(accessToken);
        }
        UserInfoDto userDto = UserInfoDto.from(findUser);

        String name = SecurityContextHolder.getContext().getAuthentication().getName();

        log.info("name: {}", name);

        return SuccessResponse.of(userDto);
    }

}
