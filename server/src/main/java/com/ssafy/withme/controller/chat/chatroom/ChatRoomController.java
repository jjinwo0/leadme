package com.ssafy.withme.controller.chat.chatroom;

import com.ssafy.withme.dto.ChatRoomGetResponse;
import com.ssafy.withme.service.chat.chatroom.ChatRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/chat/room")
@RequiredArgsConstructor
public class ChatRoomController {

    private final ChatRoomService chatRoomService;

    @GetMapping("/list")
    public List<ChatRoomGetResponse> getChatRoomList(
            @RequestHeader("Authorization") String accessToken,
            @RequestParam(name = "userId") Long userId
    ) {
        return chatRoomService.getChatRoomListByFeign(userId, accessToken);
    }

    @GetMapping("/info")
    public ChatRoomGetResponse getChatRoom(
            @RequestHeader("Authorization") String accessToken,
            @RequestParam(name = "userId") Long userId,
            @RequestParam(name = "roomId") String roomId
    ) {
        return chatRoomService.getChatRoomInfo(accessToken, userId, roomId);
    }


}
