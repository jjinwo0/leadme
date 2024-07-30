package com.ssafy.withme.controller.chat;

import com.ssafy.withme.service.chat.message.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;

@RequiredArgsConstructor
@Controller
public class ChatController {

    private final ChatService chatService;
}
