package com.ssafy.withme.controller.user;

import com.ssafy.withme.domain.user.User;
import com.ssafy.withme.dto.UserInfoDto;
import com.ssafy.withme.global.response.SuccessResponse;
import com.ssafy.withme.service.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/leadme/user")
public class UserController {

    private final UserService userService;

    @GetMapping("/info/{id}")
    public SuccessResponse<UserInfoDto> findUser(@PathVariable Long id) {

        User findUser = userService.findById(id);

        UserInfoDto userDto = UserInfoDto.from(findUser);

        String name = SecurityContextHolder.getContext().getAuthentication().getName();

        log.info("name: {}", name);

        return SuccessResponse.of(userDto);
    }
}
