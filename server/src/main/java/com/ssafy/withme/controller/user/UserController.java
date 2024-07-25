package com.ssafy.withme.controller.user;

import com.ssafy.withme.domain.user.User;
import com.ssafy.withme.dto.UserInfoDto;
import com.ssafy.withme.global.response.SuccessResponse;
import com.ssafy.withme.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/leadme/user")
public class UserController {

    private final UserService userService;
    // build
    @GetMapping("/info/{id}")
    public SuccessResponse<UserInfoDto> findUser(@PathVariable Long id) {

        User findUser = userService.findById(id);

        UserInfoDto userDto = UserInfoDto.from(findUser);

        return SuccessResponse.of(userDto);
    }
}
