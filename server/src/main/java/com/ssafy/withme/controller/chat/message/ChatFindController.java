package com.ssafy.withme.controller.chat.message;

import com.ssafy.withme.global.response.SuccessResponse;
import com.ssafy.withme.service.chat.message.ChatMongoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/chat")
@RequiredArgsConstructor
@Slf4j
public class ChatFindController {

    private final ChatMongoService chatMongoService;

    public SuccessResponse<?> roomFindInfo(
            @RequestHeader("Authorization") String accessToken,
            @RequestParam(name = "id") String id,
            @RequestParam(name = "page") Integer pageNumber
    ) {
        return SuccessResponse.of(chatMongoService.findAll(id, pageNumber));
    }
}
